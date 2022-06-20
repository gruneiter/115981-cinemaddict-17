import AbstractStatefulView from '../framework/view/abstract-stateful-view';

import { filmDate, getTimeFromMinutes } from '../helpers';

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
  } = data.film;
  return (`
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
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

              <p class="film-details_#film-description">${description}</p>
            </div>
          </div>
        </div>

        <div class="film-details__bottom-container"></div>
      </form>
    </section>
  `);
};

export default class FilmDetailsView extends AbstractStatefulView {
  _state = null;
  #film;

  constructor(film, comments) {
    super();
    this.#film = film;
    this._state = { comments, film: this.#film };
  }

  _restoreHandlers = () => {
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

  get template() {
    return createTemplate(this._state);
  }
}
