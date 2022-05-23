import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = () => ('<section class="films"></section>');

export default class Films extends AbstractStatefulView {
  get template() {
    return createTemplate();
  }
}
