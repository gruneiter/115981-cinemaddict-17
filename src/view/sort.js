import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = () => (`
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>
   `);

export default class Sort extends AbstractStatefulView {
  get template() {
    return createTemplate();
  }
}
