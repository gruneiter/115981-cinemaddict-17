import createUser from '../fish/user';

export default class UserModel {
  #rating;
  #favourites;
  #watchList;

  constructor() {
    this.#rating = createUser().rating;
    this.#favourites = createUser().favourites;
    this.#watchList = createUser().watchList;
  }

  get rating() {
    return this.#rating;
  }

  get favourites() {
    return this.#favourites;
  }

  get watchList() {
    return this.#watchList;
  }
}
