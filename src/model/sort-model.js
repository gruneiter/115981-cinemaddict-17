import Observable from '../framework/observable.js';
import {SortType} from '../constants.js';

export default class SortModel extends Observable {
  #sort = SortType.DEFAULT;
  #active = true;

  get sort() {
    return this.#sort;
  }

  get active() {
    return this.#active;
  }

  setActive = (state) => {
    this.#active = !!state;
    this._notify();
  };

  setSort = (updateType, sort) => {
    this.#sort = sort;
    this._notify(updateType, sort);
  };
}
