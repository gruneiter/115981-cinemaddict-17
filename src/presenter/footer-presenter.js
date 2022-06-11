import { render } from '../render.js';
import FooterStatisticsView from '../view/footer-statistics-view';

export default class FooterPresenter {
  #element;
  #stats;

  constructor(stats, element) {
    this.#element = element;
    this.#stats = stats;
  }

  init() {
    render(new FooterStatisticsView(this.#stats), this.#element);
  }
}
