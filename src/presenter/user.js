import { render } from '../render.js';
import Profile from '../view/profile';

export default class UserPresenter {
  #rating;
  #headerElement = document.querySelector('.header');
  constructor(user) {
    this.#rating = user.rating;
  }

  init() {
    if (this.#rating > 0) {
      render(new Profile(this.#rating), this.#headerElement);
    }
  }
}
