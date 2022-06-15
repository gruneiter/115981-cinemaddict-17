import { getRandomBool, getRandomItem, getRandomValue, getRandomArray } from '../helpers';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import data from './data.json';

dayjs.extend(dayjsRandom);

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
    date: dayjs.between('1950-01-01', Date.now()),
    releaseCountry: getRandomItem(film.releaseCountry),
  },
  runtime: getRandomValue(30, 130, 0),
  genre: getRandomArray(film.genre),
  description: getRandomItem(film.description),
  isFavorite: getRandomBool(),
  isWatched: getRandomBool(),
  isInWatchlist: getRandomBool(),
});

const createMoviesList = (amount) => new Array(amount).fill(0).map(() => createMovie());

export default createMoviesList;
