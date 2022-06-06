import { getRandomItem, getRandomValue, getRandomArray } from '../helpers';
import { nanoid } from 'nanoid';
import data from './data.json';

const { film, comment } = data;

const createMovie = () => ({
  id: nanoid(),
  commentIds: getRandomArray(comment.id),
  title: getRandomItem(film.title),
  alternativeTitle: getRandomItem(film.alternativeTitle),
  totalRating: getRandomValue(0.1, 10, 1),
  poster: getRandomItem(film.poster),
  restriction: getRandomItem(film.restriction),
  director: getRandomItem(film.director),
  writers: getRandomArray(film.writers),
  actors: getRandomArray(film.actors),
  release: {
    date: '2019-05-11T00:00:00.000Z',
    releaseCountry: getRandomItem(film.releaseCountry),
  },
  runtime: getRandomValue(30, 130, 0),
  genre: getRandomArray(film.genre),
  description: getRandomItem(film.description),
  isFavorite: false,
  isWatched: false,
  isInWatchlist: false,
});

const createMoviesList = (amount) => new Array(amount).fill(0).map(() => createMovie());

export default createMoviesList;
