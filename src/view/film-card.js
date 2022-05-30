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
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${cutDescription(description)}</p>
        <span class="film-card__comments">${ commentIds.length } comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>
   `);
};

export default class FilmCard extends AbstractStatefulView {
  #film;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createTemplate(this.#film);
  }
}
