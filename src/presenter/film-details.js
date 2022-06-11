import FilmDetails from '../view/film-details';
import {render, remove} from '../framework/render';

export default class FilmDetailsPresenter {
  #comments;
  #changeData;
  #film;
  #filmDetails = null;
  #prevFilmDetails;
  #prevFilm;

  constructor(comments, changeData) {
    this.#comments = comments;
    this.#changeData = changeData;
  }

  #handleAddClick = () => this.#changeData({...this.#film, isInWatchlist: !this.#film.isInWatchlist});
  #handleWatchedClick = () => this.#changeData({...this.#film, isWatched: !this.#film.isWatched});
  #handleFavoriteClick = () => this.#changeData({...this.#film, isFavorite: !this.#film.isFavorite});

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
      this.#prevFilmDetails.updateDetails({ film: this.#film, comments: this.#comments });
    } else {
      this.#filmDetails = new FilmDetails(film, this.#comments);
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
