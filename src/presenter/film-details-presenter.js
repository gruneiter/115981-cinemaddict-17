import FilmDetailsView from '../view/film-details-view';
import {render, remove} from '../framework/render';
import {UpdateType, UserAction} from '../constants';

export default class FilmDetailsPresenter {
  #commentsModel;
  #changeData;
  #film;
  #filmDetails = null;
  #prevFilmDetails;
  #prevFilm;

  constructor(comments, changeData) {
    this.#commentsModel = comments;
    this.#changeData = changeData;
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UserAction.DELETE_COMMENT:
        this.#filmDetails.updateDetails({ film: this.#film, comments: this.#commentsModel.comments });
        break;
    }
  };

  #handleAddClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, isInWatchlist: !this.#film.isInWatchlist},
    );
  };

  #handleWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, isWatched: !this.#film.isWatched},
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, isFavorite: !this.#film.isFavorite},
    );
  };

  #bodyElement = document.querySelector('body');

  #showDetails = () => {
    this.#bodyElement.classList.add('hide-overflow');
    render(this.#filmDetails, this.#bodyElement);
  };

  #removeDetails = () => {
    remove(this.#filmDetails);
    this.#bodyElement.classList.remove('hide-overflow');
  };

  get currentId() {
    const isOpen = this.#filmDetails ? this.#filmDetails.element.parentNode.classList.contains('hide-overflow') : false;
    return (this.#filmDetails && isOpen) ? this.#film.id : false;
  }

  init = (film) => {
    this.#prevFilm = this.#film;
    this.#film = film;
    this.#prevFilmDetails = this.#filmDetails;
    if (this.#prevFilmDetails && this.#film.id === this.#prevFilm.id) {
      this.#prevFilmDetails.updateDetails({ film: this.#film, comments: this.#commentsModel.comments });
    } else {
      this.#filmDetails = new FilmDetailsView(film, this.#commentsModel.comments);
      this.#filmDetails.setCloseHandler(this.#removeDetails);
      this.#filmDetails.setEscHandler(this.#removeDetails);
      this.#filmDetails.setWatchlistClickHandler(this.#handleAddClick);
      this.#filmDetails.setWatchedClickHandler(this.#handleWatchedClick);
      this.#filmDetails.setFavoriteClickHandler(this.#handleFavoriteClick);
      if (this.#prevFilmDetails) {
        remove(this.#prevFilmDetails);
      }
      this.#showDetails();
    }
  };
}
