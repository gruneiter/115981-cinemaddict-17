import createMoviesList from '../fish/movie';
import Observable from '../framework/observable';

export default class MovieModel extends Observable {
  #movies;

  constructor(amount) {
    super();
    this.#movies = createMoviesList(amount);
  }

  updateFilm = (updateType, update) => {
    const index = this.#movies.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  get movies() {
    return this.#movies;
  }
}
