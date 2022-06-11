import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = () => ('<button class="films-list__show-more">Show more</button>');

export default class ShowMoreView extends AbstractStatefulView {
  get template() {
    return createTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
