import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = (currentSortType) => (`
    <ul class="sort">
      <li><a href="#" class="sort__button ${ currentSortType === 'default' ? ' sort__button--active' : '' }" data-sort-type="default">Sort by default</a></li>
      <li><a href="#" class="sort__button ${ currentSortType === 'date' ? ' sort__button--active' : '' }" data-sort-type="date">Sort by date</a></li>
      <li><a href="#" class="sort__button ${ currentSortType === 'rating' ? ' sort__button--active' : '' }" data-sort-type="rating">Sort by rating</a></li>
    </ul>
   `);

export default class SortView extends AbstractStatefulView {
  #currentSortType;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
