import CommentPresenter from '../presenter/comments-presenter';
import FilmDetailsView from '../view/film-details-view';
import {render, remove} from '../framework/render';
import FilmControlsPresenter from './film-controls-presenter';

export default class FilmDetailsPresenter {
  #commentsModel;
  #commentPresenter;
  #changeData;
  #film;
  #filmDetails = null;
  #filmControlsPresenter;
  #filmControlsContainer;
  #moviesModel;

  constructor(comments, moviesModel, changeData) {
    this.#commentsModel = comments;
    this.#moviesModel = moviesModel;
    this.#changeData = changeData;
  }

  #bodyElement = document.querySelector('body');

  #showDetails = () => {
    this.#bodyElement.classList.add('hide-overflow');
    render(this.#filmDetails, this.#bodyElement);
    this.#commentPresenter = new CommentPresenter(this.#moviesModel, this.#commentsModel);
    this.#commentPresenter.init(this.#filmDetails.element.querySelector('.film-details__bottom-container'), this.#film);
  };

  #handleRemoveDetails = () => {
    remove(this.#filmDetails);
    this.#bodyElement.classList.remove('hide-overflow');
  };

  init = (film) => {
    this.#film = film;
    const prevFilmDetails = this.#filmDetails;
    if (prevFilmDetails) {
      remove(prevFilmDetails);
    }
    this.#commentsModel.init(this.#film);
    this.#filmDetails = new FilmDetailsView(film, this.#commentsModel.comments);
    this.#filmControlsContainer = this.#filmDetails.element.querySelector('.film-details__top-container');
    this.#filmControlsPresenter = new FilmControlsPresenter(this.#moviesModel, this.#changeData, true);
    this.#filmControlsPresenter.init(this.#film, this.#filmControlsContainer);
    this.#filmDetails.setCloseHandler(this.#handleRemoveDetails);
    this.#filmDetails.setEscHandler(this.#handleRemoveDetails);
    this.#showDetails();
  };
}
