import {render, replace, remove} from '../framework/render';
import FilmCardView from '../view/film-card-view';
import {UpdateType, UserAction} from '../constants';

export default class FilmPresenter {
  #container;
  #popup;
  #changeData;
  #card = null;
  #film;
  #filterModel;

  constructor(container, popup, changeData, filterModel) {
    this.#container = container;
    this.#popup = popup;
    this.#changeData = changeData;
    this.#filterModel = filterModel;
  }

  #handleAddClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      this.#filterModel.filter === 'watchlist' ? UpdateType.MINOR : UpdateType.PATCH,
      {...this.#film, isInWatchlist: !this.#film.isInWatchlist},
    );
  };

  #handleWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      this.#filterModel.filter === 'history' ? UpdateType.MINOR : UpdateType.PATCH,
      {...this.#film, isWatched: !this.#film.isWatched},
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      this.#filterModel.filter === 'favorites' ? UpdateType.MINOR : UpdateType.PATCH,
      {...this.#film, isFavorite: !this.#film.isFavorite},
    );
  };

  destroy = () => remove(this.#card);

  init = (film) => {
    const prevCard = this.#card;
    this.#film = film;
    this.#card = new FilmCardView(film);

    this.#card.setLinkClickHandler(() => this.#popup.init(film));

    this.#card.setWatchlistClickHandler(this.#handleAddClick);
    this.#card.setWatchedClickHandler(this.#handleWatchedClick);
    this.#card.setFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevCard === null) {
      render(this.#card, this.#container);
      return;
    }
    if (this.#container.contains(prevCard.element)) {
      replace(this.#card, prevCard);
    }
    remove(prevCard);
  };
}
