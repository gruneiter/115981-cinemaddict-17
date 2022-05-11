import dayjs from 'dayjs';

export const getRandomNumber = (minValue, maxValue) =>  Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

export const getRandomItem = (arr) => arr[getRandomNumber(0, arr.length - 1)];

export const getRandomArray = (array) => {
  const arrayNew = new Array(getRandomNumber(1, array.length)).fill(' ');
  arrayNew.forEach((element, index) => {
    arrayNew[index] = getRandomItem(array);
  });
  return [...new Set(arrayNew)];
};

export const getRandomValue = (minValue, maxValue, range) => {
  const randomNumber = Math.random() * (maxValue - minValue + 1) + minValue;
  return Number(randomNumber.toFixed(range));
};

export const getTimeFromMinutes = (mins) => {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;

  if (hours) {
    return `${hours}h ${minutes}m`;
  }
  return `${mins}m`;
};

export const cutDescription = (string) => `${string.substr(0, 140)}…`;

export const filmDate = (date) => dayjs(date).format('D MMMM YYYY');

export const commentDate = (date) => dayjs(date).format('YYYY/M/D h:mm');
