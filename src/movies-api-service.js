import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class MoviesApiService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  getComments = (movie) => this._load({url: `comments/${movie.id}`})
    .then(ApiService.parseResponse);

  addComment = async (movie, comment) => {
    const response = await this._load({
      url: `comments/${movie.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return await ApiService.parseResponse(response);
  };

  deleteComment = async (comment) => await this._load({
    url: `comments/${comment.id}`,
    method: Method.DELETE,
  });

  updateFilm = async (movie) => {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return await ApiService.parseResponse(response);
  };

  #adaptToServer = (movie) => ({
    id: movie.id,
    comments: movie.commentIds,
    ['film_info']: {
      actors: movie.actors,
      ['age_rating']: movie.restriction,
      ['alternative_title']: movie.alternativeTitle,
      description: movie.description,
      director: movie.director,
      genre: movie.genre,
      poster: movie.poster,
      release: {
        date: movie.release.date,
        ['release_country']: movie.release.releaseCountry,
      },
      runtime: movie.runtime,
      title: movie.title,
      ['total_rating']: movie.totalRating,
      writers: movie.writers,
    },
    ['user_details']: {
      ['already_watched']: movie.isWatched,
      favorite: movie.isFavorite,
      watchlist: movie.isInWatchlist,
      ['watching_date']: movie.watchingDate,
    },
  });
}
