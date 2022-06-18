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

  #renderProfile = () => {
    if (this.#profileComponent) {
      remove(this.#profileComponent);
    }
    this.#rating = this.#moviesModel.movies.filter((movie) => movie.isWatched).length;
    if (this.#rating > 0) {
      this.#profileComponent = new ProfileView(this.#rating);
      render(this.#profileComponent, this.#headerElement);
    }
  };

  #handleModelEvent = () => this.#renderProfile();

  init() {
    this.#renderProfile();
  }
}
