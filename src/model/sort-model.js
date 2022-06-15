import Observable from '../framework/observable.js';
import {SortType} from '../constants.js';

export default class SortModel extends Observable {
  #sort = SortType.DEFAULT;

  get sort() {
    return this.#sort;
  }

  setSort = (updateType, sort) => {
    this.#sort = sort;
    this._notify(updateType, sort);
  };
}
