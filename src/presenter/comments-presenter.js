import { render, replace } from '../framework/render';
import CommentsView from '../view/comments-view';
import {UpdateType} from '../constants';
import CommentPresenter from './comment-presenter';
import CommentsFormPresenter from './comments-form-presenter';

export default class CommentsPresenter {
  #commentsContainer = null;
  #commentsComponent = null;
  #commentsModel = null;
  #commentIds;
  #moviesModel;
  #film;
  #commentsList;
  #commentsFormPresenter;

  constructor(moviesModel, commentsModel) {
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#commentsModel.addObserver(this.#handleModelChange);
  }

  #renderForm = (commentsFormContainer, film) => {
    this.#commentsFormPresenter = new CommentsFormPresenter(this.#commentsModel);
    this.#commentsFormPresenter.init(commentsFormContainer, film);
  };

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
    this.#film = film;
    this.#renderCommentsList();
    this.#renderForm(this.#commentsComponent.element, this.#film);
    if (prevCommentsComponent) {
      replace(this.#commentsComponent, prevCommentsComponent);
    } else {
      render(this.#commentsComponent, this.#commentsContainer);
    }
  }

  #handleModelChange = (updateType, update) => {
    switch (updateType) {
      case UpdateType.PATCH:
      case UpdateType.INIT:
        this.init(this.#commentsContainer, update);
        break;
      case UpdateType.DELETE:
        this.init(this.#commentsContainer, this.#film);
        break;
    }
  };
}
