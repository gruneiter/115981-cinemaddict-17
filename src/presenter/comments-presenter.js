import { render, replace, remove } from '../framework/render';
import CommentsView from '../view/comments-view';
import {UpdateType, UserAction} from '../constants';

export default class CommentPresenter {
  #commentsContainer = null;
  #commentsComponent = null;
  #commentsModel = null;
  #commentIds;
  #moviesModel;
  #film;

  constructor(moviesModel, commentsModel) {
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#commentsModel.addObserver(this.#handleModelChange);
  }

  init(commentsContainer, film) {
    this.#commentsContainer = commentsContainer;
    this.#commentIds = film.commentIds;
    const prevCommentsComponent = this.#commentsComponent;
    this.#commentsComponent = new CommentsView(this.#commentIds, this.#commentsModel.comments);
    this.#commentsComponent.setCreateHandler(this.#handleViewAction);
    this.#commentsComponent.setDeleteHandler(this.#handleViewAction);
    this.#film = film;
    if (prevCommentsComponent) {
      replace(this.#commentsComponent, prevCommentsComponent);
    } else {
      render(this.#commentsComponent, this.#commentsContainer);
      return;
    }
    remove(prevCommentsComponent);
  }

  #handleModelChange = (updateType, update) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.init(this.#commentsContainer, update);
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update.comment);
        this.#moviesModel.updateFilm(updateType, {...this.#film, ...update.film});
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update.comment);
        this.#moviesModel.updateFilm(updateType, {...this.#film, ...update.film});
        break;
    }
  };
}
