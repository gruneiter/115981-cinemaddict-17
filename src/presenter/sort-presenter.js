import SortView from '../view/sort-view';
import {remove, render} from '../framework/render';
import {UpdateType} from '../constants';

export default class SortPresenter {
  #sortComponent = null;
  #container;
  #sortModel;
  #isActive = true;

  constructor(container, sortModel) {
    this.#container = container;
    this.#sortModel = sortModel;
    this.#sortModel.addObserver(this.#handleModelEvent);
  }

  #renderSort = () => {
    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }
    this.#sortComponent = new SortView(this.#sortModel.sort);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#container, 'afterbegin');
  };

  #handleModelEvent = () => {
    this.#isActive = this.#sortModel.active;
    this.init();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#sortModel.sort === sortType) {
      return;
    }

    this.#sortModel.setSort(UpdateType.MINOR, sortType);
  };

  init = () => {
    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }
    if (this.#isActive) {
      this.#renderSort();
    }
  };
}
