import AbstractStatefulView from '../framework/view/abstract-stateful-view';

export default class FilmAbstractView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._film = film;
    this._buttons = null;
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.addClick = callback;
    this._buttons.addEventListener('click', this.#favoriteClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this._buttons.addEventListener('click', this.#favoriteClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this._buttons.addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.dataset.type === 'add') {
      this._callback.addClick();
    }
    if (evt.target.dataset.type === 'watched') {
      this._callback.watchedClick();
    }
    if (evt.target.dataset.type === 'favorite') {
      this._callback.favoriteClick();
    }
  };
}
