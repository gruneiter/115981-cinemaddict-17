import { createElement } from '../render.js';

const createTemplate = () => ('<section class="films"></section>');

export default class Films {
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
