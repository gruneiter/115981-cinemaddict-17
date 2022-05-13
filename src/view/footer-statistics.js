import { createElement } from '../render.js';

const createTemplate = () => (`
    <section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>
  `);

export default class FooterStatistics {
  #element;

  get template() {
    return createTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }
}
