import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = (values) => (`
   <nav class="main-navigation">
     <a href = "#all" class="main-navigation__item main-navigation__item--active"> All movies</a>
     <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${ values.watchList }</span></a>
     <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${ values.history }</span></a>
     <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${ values.favourites }</span></a>
   </nav>
   `);

export default class MainNavigationView extends AbstractStatefulView {
  #values;
  constructor(values) {
    super();
    this.#values = values;
  }

  get template() {
    return createTemplate(this.#values);
  }
}
