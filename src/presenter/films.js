import Films from '../view/films';
import FilmsList from '../view/films-list';
import ShowMore from '../view/show-more';
import FilmPresenter from './film';
import FilmDetailsPresenter from './film-details';

import { MOVIES_COUNT, MOVIES_COUNT_ROW, MOVIES_COUNT_TOP } from '../constants';
import { updateItem } from '../helpers.js';

import { render } from '../render.js';

export default class FilmsPresenter {
  #mainContainer;
  #moviesModel;
  #commentsModel;
  #movies;
  #comments;
  #allMoviesTitle;
  #allMovies;
  #allMoviesContainerElement;
  #filmDetails;
  #main = new Films();
  #topRated = new FilmsList({ name: 'Top rated' }, true);
  #mostCommented = new FilmsList({ name: 'Most commented' }, true);
  #moviesLoaded = Math.min(MOVIES_COUNT, MOVIES_COUNT_ROW);
  #showMoreElement = new ShowMore();
  #filmPresenter = {};

  constructor(mainContainer, moviesModel, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#movies = Array.from(this.#moviesModel.movies);
    this.#comments = Array.from(this.#commentsModel.comments);
    this.#allMoviesTitle = this.#movies.length > 0 ? 'All movies. Upcoming' : 'There are no movies in our database';
    this.#allMovies = new FilmsList({ name: this.#allMoviesTitle, hidden: this.#movies.length > 0 });
    this.#allMoviesContainerElement = this.#allMovies.element.querySelector('.films-list__container');
    this.#filmDetails = new FilmDetailsPresenter(this.#comments, this.#handleFilmChange);
  }

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

  init = () => {
    this.#renderMainContainer();
    this.#renderAllMovies();
    this.#renderCategory(this.#topRated, this.#movies, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
    this.#renderCategory(this.#mostCommented, this.#movies, Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP));
  };
}
