import Films from '../view/films';
import FilmCard from '../view/film-card';
import FilmsList from '../view/films-list';
import FilmDetails from '../view/film-details';
import ShowMore from '../view/show-more';

import { MOVIES_COUNT, MOVIES_COUNT_TOP } from '../constants';

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

  constructor(mainContainer, moviesModel) {
    this.#mainContainer = mainContainer;
    this.#model = moviesModel;
  }

  #main = new Films();
  #allMovies = new FilmsList({ name: 'All movies. Upcoming', hidden: true });
  #topRated = new FilmsList({ name: 'Top rated' }, true);
  #mostCommented = new FilmsList({ name: 'Most commented' }, true);


  init = () => {
    this.#movies = Array.from(this.#model.movies);
    render(this.#main, this.#mainContainer);
    render(this.#allMovies, this.#main.element);
    render(new ShowMore(), this.#allMovies.element);
    render(this.#topRated, this.#main.element);
    render(this.#mostCommented, this.#main.element);
    const filmsDivElement = document.querySelectorAll('.films-list__container');
    for (let i = 0; i < MOVIES_COUNT; i++) {
      const film = new FilmCard(this.#movies[i].filmInfo);
      cardOpen(film, this.#movies[i]);
      render(film, filmsDivElement[0]);
    }
    for (let i = 0; i < MOVIES_COUNT_TOP; i++) {
      const film = new FilmCard(this.#movies[i].filmInfo);
      cardOpen(film, this.#movies[i]);
      render(film, filmsDivElement[1]);
    }
    for (let i = 0; i < MOVIES_COUNT_TOP; i++) {
      const film = new FilmCard(this.#movies[i].filmInfo);
      cardOpen(film, this.#movies[i]);
      render(film, filmsDivElement[2]);
    }
  };
}
