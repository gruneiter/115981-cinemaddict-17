import {UpdateType, UserAction} from '../constants';
import {TimeLimit} from '../constants';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import CommentFormView from '../view/comments-form-view';
import {render, replace} from '../framework/render';

export default class CommentsFormPresenter {
  #commentsModel = null;
  #film;
  #moviesModel;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);
  #commentsFormComponent = null;
  #commentsFormContainer;

  constructor(moviesModel, commentsModel) {
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#commentsModel.addObserver(this.#handleModelChange);
  }

  #handleModelChange = (updateType, update) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.init(this.#commentsFormContainer, update);
        break;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.ADD_COMMENT:
        try {
          await this.#commentsModel.addComment(updateType, update.comment);
        } catch (err) {
          this.#commentsFormComponent.shake();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  init = (commentsFormContainer, film) => {
    this.#film = film;
    const oldFormComponent = this.#commentsFormComponent;
    this.#commentsFormContainer = commentsFormContainer;
    this.#commentsFormComponent = new CommentFormView(this.#film);
    this.#commentsFormComponent.setCreateHandler(this.#handleViewAction);
    if (oldFormComponent) {
      replace(this.#commentsFormComponent, oldFormComponent);
    } else {
      render(this.#commentsFormComponent, this.#commentsFormContainer);
    }
  };
}
