import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {formatNumber} from '../helpers';

const createTemplate = (stats) => (`
    <section class="footer__statistics">
      <p>${formatNumber(stats)} movies inside</p>
    </section>
  `);

export default class FooterStatisticsView extends AbstractStatefulView {
  #stats;

  constructor(stats = 0) {
    super();
    this.#stats = stats;
  }

  get template() {
    return createTemplate(this.#stats);
  }
}
