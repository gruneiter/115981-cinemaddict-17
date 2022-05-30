import { render } from '../render.js';
import MainNavigation from '../view/main-navigation';

export default class MainNavigationPresenter {
  #element;
  #values;

  constructor(user, element) {
    this.#element = element;
    this.#values = {
      history: user.rating,
      favourites: user.favourites,
      watchList: user.watchList,
    };
  }

  init() {
    render(new MainNavigation(this.#values), this.#element, 'beforebegin');
  }
}
