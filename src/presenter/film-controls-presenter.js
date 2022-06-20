import FilmControlsView from '../view/film-controls-view';
import {UpdateType, UserAction} from '../constants';
import {render, replace} from '../framework/render';

export default class FilmControlsPresenter {
  #film;
  #details;
  #moviesModel;
  #changeData;
  #controlsComponent;
  #controlsContainer;

  constructor(moviesModel, changeData, details = false) {
    this.#moviesModel = moviesModel;
    this.#changeData = changeData;
    this.#details = details;
    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = (updateType, update) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (update.id === this.#film.id) {
          this.init(update, this.#controlsContainer);
        }
        break;
    }
  };

  #handleAddClick = async () => {
    try {
      await this.#changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        {...this.#film, isInWatchlist: !this.#film.isInWatchlist},
      );
    } catch (err) {
      this.#controlsComponent.shake();
    }
  };

  #handleWatchedClick = async () => {
    try {
      await this.#changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        {...this.#film, isWatched: !this.#film.isWatched},
      );
    } catch (err) {
      this.#controlsComponent.shake();
    }
  };

  #handleFavoriteClick = async () => {
    try {
      await this.#changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        {...this.#film, isFavorite: !this.#film.isFavorite},
      );
    } catch (err) {
      this.#controlsComponent.shake();
    }
  };

  init = (film, controlsContainer) => {
    this.#film = film;
    this.#controlsContainer = controlsContainer;
    const { isWatched, isFavorite, isInWatchlist } = this.#film;
    const controlsState = { isWatched, isFavorite, isInWatchlist };
    const oldControlsComponent = this.#controlsComponent;
    this.#controlsComponent = new FilmControlsView(controlsState, this.#details);
    this.#controlsComponent.setWatchlistClickHandler(this.#handleAddClick);
    this.#controlsComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#controlsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    if (oldControlsComponent) {
      replace(this.#controlsComponent, oldControlsComponent);
    } else {
      render(this.#controlsComponent, this.#controlsContainer, 'afterend');
    }
  };
}
