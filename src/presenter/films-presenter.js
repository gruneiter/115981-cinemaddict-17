import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreView from '../view/show-more-view';
import FilmPresenter from './film-presenter';
import FilmDetailsPresenter from './film-details-presenter';

import {
  FilterType,
  MOVIES_COUNT,
  MOVIES_COUNT_ROW,
  MOVIES_COUNT_TOP,
  SortType,
  UpdateType,
  UserAction
} from '../constants';
import {sortByCommentsCount, sortByDate, sortByRating, filter} from '../helpers.js';

import { render, remove } from '../framework/render.js';

export default class FilmsPresenter {
  #mainContainer;
  #moviesModel;
  #commentsModel;
  #movies;
  #allMoviesTitle;
  #allMovies;
  #allMoviesContainerElement;
  #topRatedMovies;
  #mostCommentedMovies;
  #filmDetails;
  #main = new FilmsView();
  #topRated = new FilmsListView({ name: 'Top rated' }, true);
  #mostCommented = new FilmsListView({ name: 'Most commented' }, true);
  #moviesLoaded = Math.min(MOVIES_COUNT, MOVIES_COUNT_ROW);
  #showMoreElement = new ShowMoreView();
  #filmPresenter = {};
  #sortModel;
  #currentSortType;
  #filterModel;
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
    this.#movies = this.movies;
    this.#filmDetails = new FilmDetailsPresenter(this.#commentsModel, this.#moviesModel, this.#handleViewAction);
    this.#moviesModel.addObserver(this.#handleModelEvent);
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
        if (this.#filmDetails.currentId) {
          this.#filmDetails.init(data);
        }
        break;
      case UpdateType.MINOR:
        this.#clearAllMoviesList();
        this.#renderAllMovies();
        break;
      case UpdateType.MAJOR:
        this.#clearAllMoviesList({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderAllMovies();
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#moviesModel.updateFilm(updateType, update);
        break;
    }
  };

  get movies() {
    const filterType = this.#filterModel.filter;
    const films = this.#moviesModel.movies;
    const filteredFilms = filter[filterType](films);
    this.#setSortType(this.#sortModel.sort);
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
    this.#filmPresenter[film.id] = this.#filmPresenter[film.id] || [];
    const card = new FilmPresenter(container, popup, this.#handleViewAction, this.#filterModel);
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
    render(category, this.#main.element, position);
    const listContainer = this.#getContainer(category);
    this.#renderMoviesList(list, listContainer, count);
  };

  #renderAllMovies = () => {
    this.#allMoviesTitle = this.movies.length > 0 ? 'All movies. Upcoming' : this.#allMoviesEmptyTitlesList[this.#filterModel.filter];
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

    if (resetRenderedTaskCount) {
      this.#moviesLoaded = MOVIES_COUNT_ROW;
    } else {
      this.#moviesLoaded = Math.min(moviesCount, this.#moviesLoaded);
    }
    if (resetSortType) {
      this.#sortModel.setSort(false, SortType.DEFAULT);
    }
  };

  init = () => {
    this.#setSortType(SortType.RATING);
    this.#topRatedMovies = [...this.movies].slice(0, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
    this.#setSortType(SortType.COMMENTS);
    this.#mostCommentedMovies = [...this.movies].slice(0, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
    this.#setSortType(SortType.DEFAULT);

    this.#renderMainContainer();
    this.#renderAllMovies();
    this.#renderCategory(this.#topRated, this.#topRatedMovies, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
    this.#renderCategory(this.#mostCommented, this.#mostCommentedMovies, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
  };
}
