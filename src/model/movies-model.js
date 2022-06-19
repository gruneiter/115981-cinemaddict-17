import Observable from '../framework/observable';
import {UpdateType} from '../constants';
import {adaptToClient} from '../helpers';

export default class MovieModel extends Observable {
  #movies = [];

  #moviesApiService = null;

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;
  }

  updateFilm = async (updateType, update) => {

    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }
    try {
      const response = await this.#moviesApiService.updateFilm(update);
      const updatedMovie = this.#adaptToClient(response);
      this.#movies = [
        ...this.#movies.slice(0, index),
        updatedMovie,
        ...this.#movies.slice(index + 1),
      ];
      this._notify(updateType, updatedMovie);
    } catch(err) {
      throw new Error('Can\'t update movie');
    }
  };

  init = async () => {
    try {
      const movies = await this.#moviesApiService.movies;
      this.#movies = movies.map(this.#adaptToClient);
    } catch(err) {
      this.#movies = [];
    }
    this._notify(UpdateType.INIT);
  };

  get movies() {
    return this.#movies;
  }

  #adaptToClient = adaptToClient;
}
