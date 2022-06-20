import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = (classes, state, details) => {
  const { container, button, watchlist, watched, favorite, active } = classes;
  const { isInWatchlist, isWatched, isFavorite } = state;
  return (`
      <div class="${ container }">
        <button class="${ button } ${ watchlist } ${ isInWatchlist ? active : '' }" type="button" data-type="add">${ details ? 'Add to watchlist' : '' }</button>
        <button class="${ button } ${ watched } ${ isWatched ? active : '' }" type="button" data-type="watched">${ details ? 'Mark as watched' : '' }</button>
        <button class="${ button } ${ favorite } ${ isFavorite ? active : '' }" type="button" data-type="favorite">${ details ? 'Mark as favorite' : '' }</button>
      </div>
   `);
};

export default class FilmControlsView extends AbstractStatefulView {
  #classes = null;
  #state = null;
  #details = null;

  constructor(state, details = false) {
    super();
    this.#state = state;
    this.#details = details;
    this.#classes = this.#createClasses();
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.addClick = callback;
    this.element.addEventListener('click', this.#favoriteClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.addEventListener('click', this.#favoriteClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.addEventListener('click', this.#favoriteClickHandler);
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

  #createClasses = () => {
    const container = `film-${ !this.#details ? 'card' : 'details' }__controls`;
    const button = `film-${ !this.#details ? 'card__controls-item' : 'details__control-button' }`;
    const watchlist = `${button}--${ !this.#details ? 'add-to-watchlist' : 'watchlist' }`;
    const watched = `${button}--${ !this.#details ? 'mark-as-watched' : 'watched' }`;
    const favorite = `${button}--${ !this.#details ? 'favorite' : 'favorite' }`;
    return {
      container,
      button,
      watchlist,
      watched,
      favorite,
      active: `${button}--active`,
    };
  };

  get template() {
    return createTemplate(this.#classes, this.#state, this.#details);
  }
}
