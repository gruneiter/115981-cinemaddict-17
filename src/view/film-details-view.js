import FilmAbstractView from './film-abstract-view';

import { commentDate, filmDate, getTimeFromMinutes } from '../helpers';

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
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`);

const renderComments = (list) => list.map((item) => renderComment(item)).join('');

const createTemplate = (data) => {
  const {
    title,
    alternativeTitle,
    totalRating,
    release,
    runtime,
    genre,
    poster,
    description,
    restriction,
    director,
    writers,
    actors,
    commentIds,
    isInWatchlist,
    isWatched,
    isFavorite,
  } = data.film;
  const { selectedEmoji } = data;
  const commentsCurrent = [];
  commentIds.forEach((id) => {
    commentsCurrent.push(data.comments.find((item) => item.id === id));
  });
  return (`
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

              <p class="film-details__age">${restriction}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${ director }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${ writers.join(', ') }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${ actors.join(', ') }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${ filmDate(release.date) }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${getTimeFromMinutes(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${ release.releaseCountry }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">${ genre.join('</span><span class="film-details__genre">') }</span>
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist${ isInWatchlist ? ' film-details__control-button--active' : '' }" id="watchlist" name="watchlist" data-type="add">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--watched${ isWatched ? ' film-details__control-button--active' : '' }" id="watched" name="watched" data-type="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite${ isFavorite ? ' film-details__control-button--active' : '' }" id="favorite" name="favorite" data-type="favorite">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container">
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
        </div>
      </form>
    </section>
  `);
};

export default class FilmDetailsView extends FilmAbstractView {
  _state = null;

  constructor(_film, comments) {
    super(_film);
    this._state = { comments, film: this._film };
    this.#setInnerHandlers();
    this._buttons = this.element.querySelector('.film-details__controls');
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this._buttons = this.element.querySelector('.film-details__controls');
    this.setWatchlistClickHandler(this._callback.addClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCloseHandler(this._callback.closeClick);
    this.setEscHandler(this._callback.escPress);
  };

  setCloseHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.addEventListener('click', this.#closeHandler);
  };

  #closeHandler = (e) => {
    if (e.target.classList.contains('film-details__close-btn')) {
      e.preventDefault();
      this._callback.closeClick();
    }
  };

  setEscHandler = (callback) => {
    this._callback.escPress = callback;
    document.addEventListener('keydown', this.#escHandler);
  };

  #escHandler = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      this._callback.escPress();
      document.removeEventListener('keydown', this.#escHandler);
    }
  };

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.alt === 'emoji') {
      const emojiName = evt.target.parentNode.getAttribute('for').slice(6);
      this.updateDetails({selectedEmoji: emojiName});
    }
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiClickHandler);
  };

  updateDetails = (update) => {
    const scroll = this.element.scrollTop;
    this.updateElement(update);
    this.element.scrollTo(0, scroll);
  };

  get template() {
    return createTemplate(this._state);
  }
}