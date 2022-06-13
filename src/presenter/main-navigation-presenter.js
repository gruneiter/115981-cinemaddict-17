import MainNavigationView from '../view/main-navigation-view';
import { render, remove } from '../framework/render';
import { FilterType, UpdateType } from '../constants';
import { filter } from '../helpers';

export default class MainNavigationPresenter {
  #element;
  #values;
  #moviesModel;
  #filterModel;
  #mainNavigationComponent = null;

  constructor(moviesModel, filterModel, element) {
    this.#element = element;
    this.#moviesModel = moviesModel;
    this.#filterModel = filterModel;
    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const movies = this.#moviesModel.movies;

    return [
      {
        type: FilterType.ALL,
        name: 'All',
        count: filter[FilterType.ALL](movies).length,
      },
      {
        type: FilterType.WATCH_LIST,
        name: 'History',
        count: filter[FilterType.WATCH_LIST](movies).length,
      },
      {
        type: FilterType.ALREADY_WATCHED,
        name: 'Favorites',
        count: filter[FilterType.ALREADY_WATCHED](movies).length,
      },
      {
        type: FilterType.FAVORITE,
        name: 'Watchlist',
        count: filter[FilterType.FAVORITE](movies).length,
      },
    ];
  }

  #renderMainNavigation = () => {
    if (this.#mainNavigationComponent) {
      remove(this.#mainNavigationComponent);
    }
    this.#values = {
      watchList: this.filters[1].count,
      history: this.filters[2].count,
      favourites: this.filters[3].count,
    };
    this.#mainNavigationComponent = new MainNavigationView(this.#values, this.#filterModel.filter);
    this.#mainNavigationComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);
    render(this.#mainNavigationComponent, this.#element, 'beforebegin');
  };

  init() {
    this.#renderMainNavigation();
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    const type = filterType.slice(filterType.indexOf('#') + 1);
    if (this.#filterModel.filter === type) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, type);
  };
}
