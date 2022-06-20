import {render, replace, remove} from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmControlsPresenter from './film-controls-presenter';

export default class FilmPresenter {
  #container;
  #popup;
  #changeData;
  #card = null;
  #film;
  #filterModel;
  #filmControlsPresenter;
  #filmControlsContainer;
  #moviesModel;

  constructor(container, popup, changeData, filterModel, moviesModel) {
    this.#container = container;
    this.#popup = popup;
    this.#changeData = changeData;
    this.#filterModel = filterModel;
    this.#moviesModel = moviesModel;
  }

  init = (film) => {
    const prevCard = this.#card;
    this.#film = film;
    this.#card = new FilmCardView(film);

    this.#card.setLinkClickHandler(() => this.#popup.init(film));
    this.#filmControlsContainer = this.#card.element.querySelector('.film-card__link');
    this.#filmControlsPresenter = new FilmControlsPresenter(this.#moviesModel, this.#changeData);
    this.#filmControlsPresenter.init(this.#film, this.#filmControlsContainer);

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
