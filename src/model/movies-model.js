import createMoviesList from '../fish/movie';
import Observable from '../framework/observable';

export default class MovieModel extends Observable{
  #movies;

  constructor(amount) {
    super();
    this.#movies = createMoviesList(amount);
  }

  get movies() {
    return this.#movies;
  }
}
