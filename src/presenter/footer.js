import { render } from '../render.js';
import FooterStatistics from '../view/footer-statistics';

export default class FooterPresenter {
  #element;
  #stats;

  constructor(stats, element) {
    this.#element = element;
    this.#stats = stats;
  }

  init() {
    render(new FooterStatistics(this.#stats), this.#element);
  }
}
