import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreView from '../view/show-more-view';
import FilmPresenter from './film-presenter';
import FilmDetailsPresenter from './film-details-presenter';

import {
  FilterType,
  MOVIES_COUNT_ROW,
  MOVIES_COUNT_TOP,
  SortType,
  UpdateType,
  UserAction,
  TimeLimit
} from '../constants';
import {sortByCommentsCount, sortByDate, sortByRating, filter, compareArrays} from '../helpers.js';

import { render, remove } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

export default class FilmsPresenter {
  #mainContainer;
  #moviesModel;
  #commentsModel;
  #allMoviesTitle;
  #allMovies;
  #allMoviesContainerElement;
  #topRatedMovies;
  #mostCommentedMovies;
  #filmDetails;
  #main = new FilmsView();
  #topRated = new FilmsListView({ name: 'Top rated' }, true);
  #mostCommented = new FilmsListView({ name: 'Most commented' }, true);
  #moviesLoaded = null;
  #showMoreElement = new ShowMoreView();
  #filmPresenter = {};
  #sortModel;
  #currentSortType;
  #filterModel;
  #isLoading = true;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);
  #renderedCategories = [];
  #allMoviesEmptyTitlesList = {
    [FilterType.ALL]: 'There are no movies in our database',
    [FilterType.WATCH_LIST]: 'There are no movies to watch now',
    [FilterType.ALREADY_WATCHED]: 'There are no watched movies now',
    [FilterType.FAVORITE]: 'There are no favorite movies now',
  };

  constructor(mainContainer, moviesModel, commentsModel, sortModel, filterModel) {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#sortModel = sortModel;
    this.#filterModel = filterModel;
    this.#filmDetails = new FilmDetailsPresenter(this.#commentsModel, this.#moviesModel, this.#handleViewAction);
    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#sortModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#setSortType(this.#sortModel.sort);
  }

  #setSortType = (sortType) => {
    this.#currentSortType = sortType;
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter[data.id].forEach((presenter) => presenter.init(data));
        this.#renderMostCommented();
        break;
      case UpdateType.MINOR:
        this.#clearAllMoviesList();
        this.#renderAllMovies();
        if (this.#filmPresenter[data.id]) {
          this.#filmPresenter[data.id].forEach((presenter) => presenter.init(data));
        }
        break;
      case UpdateType.MAJOR:
        this.#clearAllMoviesList({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderAllMovies();
        if (this.#filmPresenter[data.id]) {
          this.#filmPresenter[data.id].forEach((presenter) => presenter.init(data));
        }
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearAllMoviesList({resetRenderedTaskCount: true, resetSortType: true});
        this.init();
        break;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    const updatedMovie = this.#moviesModel.movies.find((movie) => movie.id === update.id);
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        try {
          switch (this.#filterModel.filter) {
            case FilterType.WATCH_LIST:
              if (updatedMovie.isInWatchlist !== update.isInWatchlist) {
                updateType = UpdateType.MINOR;
              }
              break;
            case FilterType.ALREADY_WATCHED:
              if (updatedMovie.isWatched !== update.isWatched) {
                updateType = UpdateType.MINOR;
              }
              break;
            case FilterType.FAVORITE:
              if (updatedMovie.isFavorite !== update.isFavorite) {
                updateType = UpdateType.MINOR;
              }
              break;
          }
          await this.#moviesModel.updateFilm(updateType, update);
        } catch (err) {
          this.#uiBlocker.unblock();
          throw new Error('can\'t');
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  get movies() {
    const filterType = this.#filterModel.filter;
    const films = [...this.#moviesModel.movies];
    const filteredFilms = filter[filterType](films);
    this.#setSortType(this.#sortModel.sort);
    this.#sortModel.setActive(filteredFilms.length);
    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.sort(sortByRating);
      case SortType.COMMENTS:
        return filteredFilms.sort(sortByCommentsCount);
    }
    return filteredFilms;
  }

  #renderFilm = (film, container, popup) => {
    if (film === undefined) {
      return;
    }
    this.#filmPresenter[film.id] = this.#filmPresenter[film.id] || [];
    const card = new FilmPresenter(container, popup, this.#handleViewAction, this.#filterModel, this.#moviesModel);
    card.init(film);
    this.#filmPresenter[film.id].push(card);
  };

  #handleShowMoreButtonClick = () => {
    const moviesCount = this.movies.length;
    const newRenderedMoviesCount = Math.min(moviesCount, this.#moviesLoaded + MOVIES_COUNT_ROW);
    const movies = this.movies.slice(this.#moviesLoaded, newRenderedMoviesCount);
    movies.forEach((movie) => this.#renderFilm(movie, this.#allMoviesContainerElement, this.#filmDetails));
    this.#moviesLoaded = newRenderedMoviesCount;

    if (this.#moviesLoaded >= moviesCount) {
      this.#showMoreElement.element.remove();
    }
  };

  #getContainer = (list) => list.element.querySelector('.films-list__container');

  #renderMainContainer = () => render(this.#main, this.#mainContainer);

  #renderLoadMore = () => {
    render(this.#showMoreElement, this.#allMovies.element);
    this.#showMoreElement.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #renderMoviesList(list, container, count) {
    for (let i = 0; i < count; i++) {
      this.#renderFilm(list[i], container, this.#filmDetails);
    }
  }

  #renderCategory = (category, list, count, position = 'beforeend') => {
    const listContainer = this.#getContainer(category);
    if (this.#renderedCategories.find((rendered) => rendered === category)) {
      listContainer.innerHTML = '';
    } else {
      render(category, this.#main.element, position);
      this.#renderedCategories.push(category);
    }
    if (this.#isLoading) {
      return;
    }
    this.#renderMoviesList(list, listContainer, count);
  };

  #renderAllMovies = () => {
    this.#moviesLoaded = Math.min(this.movies.length, MOVIES_COUNT_ROW);
    this.#allMoviesTitle = this.#isLoading ? 'Loading...' : 'All movies. Upcoming';
    this.#allMoviesTitle = this.movies.length === 0 && !this.#isLoading ? this.#allMoviesEmptyTitlesList[this.#filterModel.filter] : this.#allMoviesTitle;
    this.#allMovies = new FilmsListView({ name: this.#allMoviesTitle, hidden: this.movies.length > 0 });
    this.#allMoviesContainerElement = this.#allMovies.element.querySelector('.films-list__container');
    this.#renderCategory(this.#allMovies, this.movies, this.#moviesLoaded, 'afterbegin');
    if (this.movies.length > this.#moviesLoaded) {
      this.#renderLoadMore();
    }
  };

  #clearAllMoviesList = ({resetRenderedTaskCount = false, resetSortType = false} = {}) => {
    const moviesCount = this.movies.length;
    remove(this.#allMovies);
    this.#moviesLoaded = resetRenderedTaskCount ? MOVIES_COUNT_ROW : Math.min(moviesCount, this.#moviesLoaded);
    if (resetSortType) {
      this.#sortModel.setSort(false, SortType.DEFAULT);
    }
  };

  #renderMostCommented = () => {
    const oldMostCommented = this.#mostCommentedMovies || [];
    const oldSort = this.#sortModel.sort;
    this.#sortModel.setSort(UpdateType.NONE, SortType.COMMENTS);
    this.#mostCommentedMovies = [...this.movies]
      .filter((movie) => movie.commentIds.length > 0)
      .slice(0, Math.min(this.movies.length, MOVIES_COUNT_TOP));
    this.#sortModel.setSort(UpdateType.NONE, oldSort);
    if (!compareArrays(oldMostCommented, this.#mostCommentedMovies)) {
      this.#renderCategory(this.#mostCommented, this.#mostCommentedMovies, Math.min(this.movies.length, MOVIES_COUNT_TOP));
    }
  };

  init = () => {
    this.#sortModel.setSort(UpdateType.NONE, SortType.RATING);
    this.#topRatedMovies = [...this.movies]
      .filter((movie) => movie.totalRating > 0)
      .slice(0, Math.min(this.movies.length, MOVIES_COUNT_TOP));
    this.#sortModel.setSort(UpdateType.NONE, SortType.DEFAULT);

    this.#renderMainContainer();
    this.#renderAllMovies();
    if (this.#isLoading) {
      return;
    }
    if (this.#topRatedMovies.length > 0) {
      this.#renderCategory(this.#topRated, this.#topRatedMovies, Math.min(this.movies.length, MOVIES_COUNT_TOP));
    }
    this.#renderMostCommented();
  };
}
