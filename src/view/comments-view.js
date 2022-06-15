import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import he from 'he';
import {nanoid} from 'nanoid';
import { commentDate } from '../helpers';
import { UserAction } from '../constants';

const updateCommentEmoji = (emoji) => emoji ? `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : '';

const renderComment = (comment) => (`
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${commentDate(comment.date)}</span>
        <button class="film-details__comment-delete" data-comment-id= '${ comment.id }'>Delete</button>
      </p>
    </div>
  </li>`
);

const renderComments = (list) => list.map((item) => renderComment(item)).join('');

const createTemplate = (data) => {
  const {commentIds, selectedEmoji} = data;
  let commentsCurrent = [];
  commentIds.forEach((id) => {
    commentsCurrent.push(data.comments.find((item) => item.id === id));
  });
  commentsCurrent = commentsCurrent.filter((comment) => comment !== undefined);
  return `
    <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${ commentsCurrent.length }</span></h3>

    <ul class="film-details__comments-list">
        ${ renderComments(commentsCurrent) }
    </ul>

    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">${updateCommentEmoji(selectedEmoji)}</div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${selectedEmoji === 'smile' ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${selectedEmoji === 'sleeping' ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${selectedEmoji === 'puke' ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${selectedEmoji === 'angry' ? 'checked' : ''}>
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>
  </section>
  `;
};

export default class CommentsView extends AbstractStatefulView {

  #comments;

  constructor(commentIds, comments) {
    super();
    this.#comments = comments;
    this._state = { comments: this.#comments, commentIds };
    this.#setInnerHandlers();
    this._buttons = this.element.querySelector('.film-details__controls');
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.alt === 'emoji') {
      const emojiName = evt.target.parentNode.getAttribute('for').slice(6);
      this.updateElement({selectedEmoji: emojiName});
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiClickHandler);
  };

  setDeleteHandler = (callback) => {
    this._callback.deleteComment = callback;
    this.element.addEventListener('click', this.#deleteHandler);
  };

  setCreateHandler = (callback) => {
    this._callback.createComment = callback;
    document.addEventListener('keydown', this.#createHandler);
  };

  #deleteHandler = (event) => {
    if (event.target.classList.contains('film-details__comment-delete')) {
      event.preventDefault();
      const id = event.target.dataset.commentId;
      const elementForDelete = this._state.commentIds.indexOf(id);
      const comment = this.#comments.find((com) => `${com.id}` === id);
      this._state.commentIds = [
        ...this._state.commentIds.slice(0, elementForDelete),
        ...this._state.commentIds.slice(elementForDelete + 1),
      ];
      this._callback.deleteComment(UserAction.DELETE_COMMENT, '', { film: { commentIds: this._state.commentIds }, comment });
      document.removeEventListener('keydown', this.#createHandler);
    }
  };

  #createHandler = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.code === 'Enter') {
      const comment = this.#createComment();
      this._state.comments.push(comment);
      this._state.commentIds.push(comment.id);
      this._callback.createComment(UserAction.ADD_COMMENT, '', { film: { commentIds: this._state.commentIds }, comment: this._state.comments.at(-1) });
      document.removeEventListener('keydown', this.#createHandler);
    }
  };

  #createComment = () => ({
    id: nanoid(),
    author: 'dima m.',
    comment: he.encode(this.element.querySelector('.film-details__comment-input').value),
    date: new Date(),
    emotion: this.element.querySelector('.film-details__emoji-item:checked').value
  });

  get template() {
    return createTemplate(this._state);
  }
}
