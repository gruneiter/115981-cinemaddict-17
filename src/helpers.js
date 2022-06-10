import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const getRandomNumber = (minValue, maxValue) =>  Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

export const getRandomItem = (arr) => arr[getRandomNumber(0, arr.length - 1)];

export const getRandomArray = (array) => {
  const arrayNew = new Array(getRandomNumber(1, array.length)).fill(' ').map(() => getRandomItem(array));
  return [...new Set(arrayNew)];
};

export const getRandomValue = (minValue, maxValue, range) => {
  const randomNumber = Math.random() * (maxValue - minValue + 1) + minValue;
  return Number(randomNumber.toFixed(range));
};

export const getTimeFromMinutes = (mins) => {
  const hours = dayjs.duration(mins, 'minutes').hours();
  const minutes = dayjs.duration(mins, 'minutes').minutes();

  if (hours) {
    return `${hours}h ${minutes}m`;
  }
  return `${mins}m`;
};

export const cutDescription = (string) => `${string.substr(0, 140)}…`;

export const filmDate = (date) => dayjs(date).format('D MMMM YYYY');

export const commentDate = (date) => dayjs(date).fromNow();

export const numberFormat = (price) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

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
