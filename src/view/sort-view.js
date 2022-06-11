import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = () => (`
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="default">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="date">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="rating">Sort by rating</a></li>
    </ul>
   `);

export default class SortView extends AbstractStatefulView {
  get template() {
    return createTemplate();
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
    const links = Array.from(evt.currentTarget.querySelectorAll('a'));
    links.forEach((link) => link.classList.remove('sort__button--active'));
    evt.target.classList.add('sort__button--active');
  };
}
