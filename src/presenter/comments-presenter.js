import { render, replace } from '../framework/render';
import CommentsView from '../view/comments-view';
import {UpdateType, UserAction, TimeLimit} from '../constants';
import CommentPresenter from './comment-presenter';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class CommentsPresenter {
  #commentsContainer = null;
  #commentsComponent = null;
  #commentsModel = null;
  #commentIds;
  #moviesModel;
  #film;
  #commentsList;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(moviesModel, commentsModel) {
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#commentsModel.addObserver(this.#handleModelChange);
  }

  #renderComment = (comment) => {
    this.#commentsList = this.#commentsComponent.element.querySelector('.film-details__comments-list');
    const commentItem = new CommentPresenter(comment, this.#film, this.#moviesModel, this.#commentsModel);
    commentItem.init(this.#commentsList);
  };

  #renderCommentsList = () => {
    this.#commentsModel.comments.forEach((comment) => this.#renderComment(comment));
  };

  init(commentsContainer, film) {
    this.#commentsContainer = commentsContainer;
    this.#commentIds = film.commentIds;
    const prevCommentsComponent = this.#commentsComponent;
    this.#commentsComponent = new CommentsView(this.#commentIds, this.#commentsModel.comments);
    this.#commentsComponent.setCreateHandler(this.#handleViewAction);
    this.#film = film;
    this.#renderCommentsList();
    if (prevCommentsComponent) {
      replace(this.#commentsComponent, prevCommentsComponent);
    } else {
      render(this.#commentsComponent, this.#commentsContainer);
    }
  }

  #handleModelChange = (updateType, update) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.init(this.#commentsContainer, update);
        break;
      case UpdateType.DELETE:
        this.init(this.#commentsContainer, this.#film);
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
          this.#commentsComponent.shake();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };
}
