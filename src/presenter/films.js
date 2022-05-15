import Films from '../view/films';
import FilmCard from '../view/film-card';
import FilmsList from '../view/films-list';
import FilmDetails from '../view/film-details';
import ShowMore from '../view/show-more';

import { MOVIES_COUNT, MOVIES_COUNT_ROW, MOVIES_COUNT_TOP } from '../constants';

import { render } from '../render.js';

const bodyElement = document.querySelector('body');

const removeDetails = () => {
  const detailsElement = document.querySelector('.film-details');
  detailsElement.remove();
  bodyElement.classList.remove('hide-overflow');
};

const closeOnEsc = (e) => {
  e.preventDefault();
  if (e.key === 'Escape' || e.key === 'Esc') {
    document.removeEventListener('keydown', closeOnEsc);
    removeDetails();
  }
};

const showDetails = (details) => {
  const oldDetailsElement = document.querySelector('.film-details');
  if (oldDetailsElement) {
    oldDetailsElement.remove();
  }
  details.element.addEventListener('click', (e) => {
    if (e.target.classList.contains('film-details__close-btn')) {
      removeDetails(details);
    }
  });
  document.addEventListener('keydown', closeOnEsc);
  bodyElement.classList.add('hide-overflow');
  render(details, bodyElement);
};

const cardOpen = (film, movie) => {
  const linkElement = film.element.querySelector('.film-card__link');
  linkElement.addEventListener('click', (e) => {
    e.preventDefault();
    showDetails(new FilmDetails(movie));
  });
};

export default class FilmsPresenter {
  #mainContainer;
  #model;
  #movies;
  #allMoviesTitle;
  #allMovies;
  #allMoviesContainerElement;
  #main = new Films();
  #topRated = new FilmsList({ name: 'Top rated' }, true);
  #mostCommented = new FilmsList({ name: 'Most commented' }, true);
  #topRatedContainerElement = this.#topRated.element.querySelector('.films-list__container');
  #mostCommentedContainerElement = this.#mostCommented.element.querySelector('.films-list__container');
  #moviesLoaded = Math.min(MOVIES_COUNT, MOVIES_COUNT_ROW);
  #showMoreElement = new ShowMore();

  constructor(mainContainer, moviesModel) {
    this.#mainContainer = mainContainer;
    this.#model = moviesModel;
    this.#movies = Array.from(this.#model.movies);
    this.#allMoviesTitle = this.#movies.length > 0 ? 'All movies. Upcoming' : 'There are no movies in our database';
    this.#allMovies = new FilmsList({ name: this.#allMoviesTitle, hidden: this.#movies.length > 0 });
    this.#allMoviesContainerElement = this.#allMovies.element.querySelector('.films-list__container');
  }

  #handleShowMoreButtonClick = () => {
    this.#movies
      .slice(this.#moviesLoaded, this.#moviesLoaded + MOVIES_COUNT_ROW)
      .forEach((movie) => render(new FilmCard(movie.filmInfo), this.#allMoviesContainerElement));
    this.#moviesLoaded += MOVIES_COUNT_ROW;
    if (this.#moviesLoaded > MOVIES_COUNT) {
      this.#showMoreElement.element.remove();
    }
  };

  init = () => {
    render(this.#main, this.#mainContainer);
    render(this.#allMovies, this.#main.element);
    if (this.#movies.length > this.#moviesLoaded) {
      render(this.#showMoreElement, this.#allMovies.element);
      this.#showMoreElement.element.addEventListener('click', this.#handleShowMoreButtonClick);
    }
    render(this.#topRated, this.#main.element);
    render(this.#mostCommented, this.#main.element);
    for (let i = 0; i < this.#moviesLoaded; i++) {
      const film = new FilmCard(this.#movies[i].filmInfo);
      cardOpen(film, this.#movies[i]);
      render(film, this.#allMoviesContainerElement);
    }
    for (let i = 0; i < Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP); i++) {
      const film = new FilmCard(this.#movies[i].filmInfo);
      cardOpen(film, this.#movies[i]);
      render(film, this.#topRatedContainerElement);
    }
    for (let i = 0; i < Math.min(MOVIES_COUNT, MOVIES_COUNT_TOP); i++) {
      const film = new FilmCard(this.#movies[i].filmInfo);
      cardOpen(film, this.#movies[i]);
      render(film, this.#mostCommentedContainerElement);
    }
  };
}
