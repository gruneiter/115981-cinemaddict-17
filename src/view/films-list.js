import { createElement } from '../render.js';

const createTemplate = (title, extra) => (`
    <section class="films-list ${ extra ? ' films-list--extra' : '' }">
      <h2 class="films-list__title${ title.hidden ? ' visually-hidden' : '' }">${title.name}</h2>
      <div class="films-list__container">

      </div>
    </section>
  `);


export default class FilmsList {
  constructor(title, extra) {
    this.title = title;
    this.extra = extra;
  }

  getTemplate() {
    return createTemplate(this.title, this.extra);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}
