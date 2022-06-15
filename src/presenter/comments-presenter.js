import { render, replace, remove } from '../framework/render';
import CommentsView from '../view/comments-view';
import { UserAction } from '../constants';

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
    this.#moviesModel.addObserver(this.#handleModelChange);
  }

  init(commentsContainer, commentIds, film, ) {
    this.#commentsContainer = commentsContainer;
    this.#commentIds = commentIds;
    const prevCommentsComponent = this.#commentsComponent;
    this.#commentsComponent = new CommentsView(this.#commentIds, this.#commentsModel.comments);
    this.#commentsComponent.setCreateHandler(this.#handleViewAction);
    this.#commentsComponent.setDeleteHandler(this.#handleViewAction);
    this.#film = film;
    if (!prevCommentsComponent) {
      render(this.#commentsComponent, this.#commentsContainer);
      return;
    }
    if (this.#commentsContainer.contains(prevCommentsComponent.element)) {
      replace(this.#commentsComponent, prevCommentsComponent);
    }
    remove(prevCommentsComponent);
  }

  #handleModelChange = (updateType, update) => {
    this.init(this.#commentsContainer, update.commentIds, this.#film, this.#commentsModel);
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
