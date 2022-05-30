import { getRandomNumber } from '../helpers';

const createUser = () => ({
  rating: getRandomNumber(0, 30),
  favourites: getRandomNumber(0, 30),
  watchList: getRandomNumber(0, 30),
});

export default createUser;
