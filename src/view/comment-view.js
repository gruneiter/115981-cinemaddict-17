import {commentDate} from '../helpers';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {UpdateType, UserAction} from '../constants';

const createTemplate = (comment) => (`
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${commentDate(comment.date)}</span>
        <button class="film-details__comment-delete" data-comment-id= '${ comment.id }' ${ comment.isDeleting ? 'disabled' : '' }>${ comment.isDeleting ? 'Deleting...' : 'Delete' }</button>
      </p>
    </div>
  </li>`
);

export default class CommentsView extends AbstractStatefulView {

  #comment;

  constructor(comment) {
    super();
    this.#comment = comment;
    this._state = comment;
    this._buttons = this.element.querySelector('.film-details__controls');
  }

  _restoreHandlers = () => {
    this.setCreateHandler(this._callback.createComment);
  };

  setDeleteHandler = (callback) => {
    this._callback.deleteComment = callback;
    this.element.addEventListener('click', this.#deleteHandler);
  };

  #deleteHandler = (event) => {
    if (event.target.classList.contains('film-details__comment-delete')) {
      event.preventDefault();
      this._callback.deleteComment(UserAction.DELETE_COMMENT, UpdateType.DELETE, this.#comment);
    }
  };

  get template() {
    return createTemplate(this._state);
  }
}
