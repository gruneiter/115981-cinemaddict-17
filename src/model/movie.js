import createMoviesList from "../fish/movie";

export default class MovieModel {
  constructor(amount) {
    this.movies = createMoviesList(amount);
  }

  getMovies = () => this.movies;
}
