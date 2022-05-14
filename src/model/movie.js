import createMoviesList from '../fish/movie';

export default class MovieModel {
  #movies;

  constructor(amount) {
    this.#movies = createMoviesList(amount);
  }

  get movies() {
    return this.#movies;
  }
}
