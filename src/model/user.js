import createUserRating from '../fish/user';

export default class UserModel {
  #rating;

  constructor() {
    this.#rating = createUserRating();
  }

  get rating() {
    return this.#rating;
  }
}
