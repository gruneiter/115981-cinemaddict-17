import { render } from '../framework/render.js';
import FooterStatisticsView from '../view/footer-statistics-view';
import {UpdateType} from '../constants';

export default class FooterPresenter {
  #element;
  #moviesModel;
  #stats;
  #isLoading = true;

  constructor(moviesModel, element) {
    this.#element = element;
    this.#moviesModel = moviesModel;
    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#stats = this.#moviesModel.movies.length;
        this.#isLoading = false;
        this.init();
        break;
    }
  };

  init() {
    if (this.#isLoading) {
      return;
    }
    render(new FooterStatisticsView(this.#stats), this.#element);
  }
}
