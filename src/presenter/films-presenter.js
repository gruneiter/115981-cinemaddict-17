import FilmsView from '../view/films-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreView from '../view/show-more-view';
import SortView from '../view/sort-view';
import FilmPresenter from './film-presenter';
import FilmDetailsPresenter from './film-details-presenter';

import {MOVIES_COUNT, MOVIES_COUNT_ROW, MOVIES_COUNT_TOP, SortType} from '../constants';
import {sortByCommentsCount, sortByDate, sortByRating, updateItem} from '../helpers.js';

import { render, remove } from '../framework/render.js';

export default class FilmsPresenter {
  #mainContainer;
  #moviesModel;
  #commentsModel;
  #movies;
  #comments;
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
  #sortComponent = new SortView();
  #currentSortType = SortType.DEFAULT;
  #sourcedFilms = [];

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#movies.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#movies.sort(sortByRating);
        break;
      case SortType.COMMENTS:
        this.#movies.sort(sortByCommentsCount);
        break;
      default:
        this.#movies = [...this.#sourcedFilms];
    }
    this.#currentSortType = sortType;
  };

  constructor(mainContainer, moviesModel, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#movies = Array.from(this.#moviesModel.movies);
    this.#comments = Array.from(this.#commentsModel.comments);
    this.#allMoviesTitle = this.#movies.length > 0 ? 'All movies. Upcoming' : 'There are no movies in our database';
    this.#allMovies = new FilmsListView({ name: this.#allMoviesTitle, hidden: this.#movies.length > 0 });

    this.#allMoviesContainerElement = this.#allMovies.element.querySelector('.films-list__container');
    this.#filmDetails = new FilmDetailsPresenter(this.#comments, this.#handleFilmChange);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearMoviesList();
    this.#renderAllMovies();
    this.#renderCategory(this.#topRated, this.#topRatedMovies, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
    this.#renderCategory(this.#mostCommented, this.#mostCommentedMovies, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainContainer, 'afterbegin');
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilm = (film, container, popup) => {
    this.#filmPresenter[film.id] = this.#filmPresenter[film.id] || [];
    const card = new FilmPresenter(container, popup, this.#handleFilmChange);
    card.init(film);
    this.#filmPresenter[film.id].push(card);
  };

  #handleShowMoreButtonClick = () => {
    this.#movies
      .slice(this.#moviesLoaded, this.#moviesLoaded + MOVIES_COUNT_ROW)
      .forEach((movie) => this.#renderFilm(movie, this.#allMoviesContainerElement));
    this.#moviesLoaded += MOVIES_COUNT_ROW;
    if (this.#moviesLoaded > MOVIES_COUNT) {
      this.#showMoreElement.element.remove();
    }
  };

  #handleFilmChange = (updatedFilm) => {
    this.#movies = updateItem(this.#movies, updatedFilm);
    this.#filmPresenter[updatedFilm.id].forEach((item) => item.init(updatedFilm));
    if (this.#filmDetails.currentId) {
      this.#filmDetails.init(updatedFilm);
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

  #renderCategory = (category, list, count) => {
    render(category, this.#main.element);
    const listContainer = this.#getContainer(category);
    this.#renderMoviesList(list, listContainer, count);
  };

  #renderAllMovies = () => {
    this.#renderCategory(this.#allMovies, this.#movies, this.#moviesLoaded);
    if (this.#movies.length > this.#moviesLoaded) {
      this.#renderLoadMore();
    }
  };

  #clearMoviesList = () => {
    Object.values(this.#filmPresenter).forEach((presenter) => {
      presenter.forEach((item) => item.destroy());
    });
    this.#filmPresenter = {};
    this.#moviesLoaded = MOVIES_COUNT_ROW;
    remove(this.#showMoreElement);
  };

  init = () => {
    this.#sourcedFilms = [...this.#movies];

    this.#sortFilms(SortType.RATING);
    this.#topRatedMovies = [...this.#movies].slice(0, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
    this.#sortFilms(SortType.COMMENTS);
    this.#mostCommentedMovies = [...this.#movies].slice(0, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
    this.#sortFilms(SortType.DEFAULT);

    this.#renderMainContainer();
    this.#renderSort();
    this.#renderAllMovies();
    this.#renderCategory(this.#topRated, this.#topRatedMovies, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
    this.#renderCategory(this.#mostCommented, this.#mostCommentedMovies, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
  };
}
