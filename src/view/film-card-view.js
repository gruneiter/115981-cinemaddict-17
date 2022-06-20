import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { filmDate, getTimeFromMinutes, cutDescription } from '../helpers';

const createTemplate = (film) => {
  const { title, totalRating, release, runtime, genre, poster, description, commentIds } = film;
  return (`
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${filmDate(release.date)}</span>
          <span class="film-card__duration">${getTimeFromMinutes(runtime)}</span>
          <span class="film-card__genre">${ genre.join(' ') }</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${cutDescription(description)}</p>
        <span class="film-card__comments">${ commentIds.length } comments</span>
      </a>
    </article>
   `);
};

export default class FilmCardView extends AbstractStatefulView {
  #film;
  constructor(film) {
    super();
    this.#film = film;
  }

  setLinkClickHandler = (callback) => {
    const link = this.element.querySelector('a');
    this._callback.linkClick = callback;
    link.addEventListener('click', this.#linkClickHandler);
  };

  #linkClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.linkClick();
  };

  get template() {
    return createTemplate(this.#film);
  }
}
