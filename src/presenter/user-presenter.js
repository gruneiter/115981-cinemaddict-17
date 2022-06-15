import { render, remove } from '../framework/render.js';
import ProfileView from '../view/profile-view';

export default class UserPresenter {
  #rating;
  #moviesModel;
  #profileComponent;
  #headerElement = document.querySelector('.header');

  constructor(moviesModel) {
    this.#moviesModel = moviesModel;
    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  #removeProfile = () => remove(this.#profileComponent);

  #renderProfile = () => {
    this.#rating = this.#moviesModel.movies.filter((movie) => movie.isWatched).length;
    if (this.#rating > 0) {
      this.#profileComponent = new ProfileView(this.#rating);
      render(this.#profileComponent, this.#headerElement);
    }
  };

  #handleModelEvent = () => {
    this.#removeProfile();
    this.#renderProfile();
  };

  init() {
    this.#renderProfile();
  }
}
