import { render } from '../render.js';
import MainNavigationView from '../view/main-navigation-view';

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
    render(new MainNavigationView(this.#values), this.#element, 'beforebegin');
  }
}
