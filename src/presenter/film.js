import {render, replace, remove} from '../framework/render';
import FilmCard from '../view/film-card';

export default class FilmPresenter {
  #container;
  #popup;
  #changeData;
  #card = null;
  #film;

  constructor(container, popup, changeData) {
    this.#container = container;
    this.#popup = popup;
    this.#changeData = changeData;
  }

  #handleAddClick = () => this.#changeData({...this.#film, isInWatchlist: !this.#film.isInWatchlist});
  #handleWatchedClick = () => this.#changeData({...this.#film, isWatched: !this.#film.isWatched});
  #handleFavoriteClick = () => this.#changeData({...this.#film, isFavorite: !this.#film.isFavorite});

  init = (film) => {
    const prevCard = this.#card;
    this.#film = film;
    this.#card = new FilmCard(film);

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
