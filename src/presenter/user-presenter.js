import { render } from '../render.js';
import ProfileView from '../view/profile-view';

export default class UserPresenter {
  #rating;
  #headerElement = document.querySelector('.header');
  constructor(user) {
    this.#rating = user.rating;
  }

  init() {
    if (this.#rating > 0) {
      render(new ProfileView(this.#rating), this.#headerElement);
    }
  }
}
