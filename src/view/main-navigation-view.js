import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = (values, currentFilterType) => (`
   <nav class="main-navigation">
     <a href="#all" class="main-navigation__item${ currentFilterType === 'all' ? ' main-navigation__item--active' : '' }"> All movies</a>
     <a href="#watchlist" class="main-navigation__item${ currentFilterType === 'watchlist' ? ' main-navigation__item--active' : '' }">Watchlist <span class="main-navigation__item-count">${ values.watchList }</span></a>
     <a href="#history" class="main-navigation__item${ currentFilterType === 'history' ? ' main-navigation__item--active' : ' ' }">History <span class="main-navigation__item-count">${ values.history }</span></a>
     <a href="#favorites" class="main-navigation__item${ currentFilterType === 'favorites' ? ' main-navigation__item--active' : '' }">Favorites <span class="main-navigation__item-count">${ values.favourites }</span></a>
   </nav>
   `);

export default class MainNavigationView extends AbstractStatefulView {
  #values;
  #currentFilterType;

  constructor(values, currentFilterType) {
    super();
    this.#values = values;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createTemplate(this.#values, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.closest('.main-navigation__item')) {
      const link = evt.target.closest('.main-navigation__item');
      evt.preventDefault();
      this._callback.filterTypeChange(link.href);
    }
  };
}
