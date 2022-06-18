import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class TasksApiService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  getComments = (movie) => this._load({url: `comments/${movie.id}`})
    .then(ApiService.parseResponse);

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
    film_info: {  // eslint-disable-line
      actors: movie.actors,
      age_rating: movie.restriction,  // eslint-disable-line
      alternative_title: movie.alternativeTitle,  // eslint-disable-line
      description: movie.description,
      director: movie.director,
      genre: movie.genre,
      poster: movie.poster,
      release: {
        date: movie.release.date,
        release_country: movie.release.releaseCountry,  // eslint-disable-line
      },
      runtime: movie.runtime,
      title: movie.title,
      total_rating: movie.totalRating,  // eslint-disable-line
      writers: movie.writers,
    },
    user_details: {  // eslint-disable-line
      already_watched: movie.isWatched,  // eslint-disable-line
      favorite: movie.isFavorite,
      watchlist: movie.isInWatchlist,
      watching_date: movie.watchingDate,  // eslint-disable-line
    },
  });
}
