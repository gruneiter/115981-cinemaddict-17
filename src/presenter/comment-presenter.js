import {render, replace} from '../framework/render';
import CommentView from '../view/comment-view';
import {UpdateType, UserAction, TimeLimit} from '../constants';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class CommentPresenter {
  #comment = null;
  #film = null;
  #commentsContainer = null;
  #commentComponent;
  #commentsModel;
  #moviesModel;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(comment, film, moviesModel, commentsModel) {
    this.#comment = comment;
    this.#film = film;
    this.#commentsModel = commentsModel;
    this.#moviesModel = moviesModel;
    this.#moviesModel.addObserver(this.#handleModelChange);
  }

  #handleModelChange = (updateType) => {
    switch (updateType) {
      case UpdateType.DELETE:
        this.init(this.#commentsContainer);
        break;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.DELETE_COMMENT:
        try {
          this.init(this.#commentsContainer, true);
          this.#film.commentIds = [
            ...this.#film.commentIds.slice(0, this.#film.commentIds.indexOf(update.id)),
            ...this.#film.commentIds.slice(this.#film.commentIds.indexOf(update.id) + 1),
          ];
          await this.#moviesModel.updateFilm(updateType, this.#film);
          await this.#commentsModel.deleteComment(updateType, update);
        } catch (err) {
          await this.#uiBlocker.unblock();
          this.#commentComponent.shake();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  init = (commentsContainer, isDeleting = false) => {
    const oldCommentComponent = this.#commentComponent;
    this.#commentsContainer = commentsContainer;
    this.#commentComponent = new CommentView({...this.#comment, isDeleting});
    this.#commentComponent.setDeleteHandler(this.#handleViewAction);
    if (oldCommentComponent) {
      replace(this.#commentComponent, oldCommentComponent);
    } else {
      render(this.#commentComponent, this.#commentsContainer);
    }
  };
}
