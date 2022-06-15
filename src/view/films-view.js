import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = () => ('<section class="films"></section>');

export default class FilmsView extends AbstractStatefulView {
  get template() {
    return createTemplate();
  }
}
