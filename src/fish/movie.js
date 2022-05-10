import { getRandomItem, getRandomValue, getRandomArray } from '../helpers';
import data from './data.json'

const { film, comment } = data;

const createMovie = () => ({
  comments: getRandomArray(comment.id),
  filmInfo: {
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
  }
});

const createMoviesList = (amount) => {
  const array = [];
  for (let i = 1; i <= amount; i++) {
    array.push(createMovie());
  }
  return array;
};
export default createMoviesList;
