import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import { FilterType } from './constants';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const getTimeFromMinutes = (mins) => {
  const hours = dayjs.duration(mins, 'minutes').hours();
  const minutes = dayjs.duration(mins, 'minutes').minutes();

  if (hours) {
    return `${hours}h ${minutes}m`;
  }
  return `${mins}m`;
};

export const cutDescription = (string) => `${string.substr(0, 140)}…`;

export const formatFilmDate = (date) => dayjs(date).format('D MMMM YYYY');

export const formatCommentDate = (date) => dayjs(date).fromNow();

export const formatNumber = (price) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.release.date, filmB.release.date);
  return weight ?? dayjs(filmB.release.date).diff(dayjs(filmA.release.date));
};

export const sortByRating = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.totalRating, filmB.totalRating);
  return weight ?? filmB.totalRating - filmA.totalRating;
};

export const sortByCommentsCount = (filmA, filmB) => filmB.commentIds.length - filmA.commentIds.length;

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCH_LIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.ALREADY_WATCHED]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITE]: (films) => films.filter((film) => film.isFavorite),
};

export const adaptToClient = (movie) => ({
  id: movie.id,
  commentIds: movie.comments,
  title: movie.film_info.title,
  alternativeTitle: movie.film_info.alternative_title,
  totalRating: movie.film_info.total_rating,
  poster: movie.film_info.poster,
  restriction: movie.film_info.age_rating,
  director: movie.film_info.director,
  writers: movie.film_info.writers,
  actors: movie.film_info.actors,
  release: {
    date: movie.film_info.release.date,
    releaseCountry: movie.film_info.release.release_country,
  },
  runtime: movie.film_info.runtime,
  genre: movie.film_info.genre,
  description: movie.film_info.description,
  isFavorite: movie.user_details.favorite,
  isWatched: movie.user_details.already_watched,
  isInWatchlist: movie.user_details.watchlist,
  watchingDate: movie.user_details.watching_date,
});
