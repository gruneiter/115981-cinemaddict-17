import { createElement } from '../render.js';

const createTemplate = () => ('<section class="films"></section>');

export default class Films {
  getTemplate() {
    return createTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}
