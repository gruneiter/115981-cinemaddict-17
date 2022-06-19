import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import he from 'he';
import {UpdateType, UserAction} from '../constants';

const updateCommentEmoji = (emoji) => emoji ? `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : '';

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
    this.setCreateHandler(this._callback.createComment);
  };

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.alt === 'emoji') {
      const emojiName = evt.target.parentNode.getAttribute('for').slice(6);
      this.updateElement({selectedEmoji: emojiName});
      this._restoreHandlers();
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiClickHandler);
  };

  setCreateHandler = (callback) => {
    this._callback.createComment = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#createHandler);
  };

  #createHandler = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.code === 'Enter') {
      const comment = this.#createComment();
      this._state.comments.push(comment);
      this._state.commentIds.push(comment.id);
      this._callback.createComment(UserAction.ADD_COMMENT, UpdateType.INIT, { film: { commentIds: this._state.commentIds }, comment: this._state.comments.at(-1) });
      this.element.querySelector('.film-details__emoji-list').removeEventListener('keydown', this.#createHandler);
    }
  };

  #createComment = () => ({
    comment: he.encode(this.element.querySelector('.film-details__comment-input').value),
    date: new Date(),
    emotion: this.element.querySelector('.film-details__emoji-item:checked').value
  });

  get template() {
    return createTemplate(this._state);
  }
}
