import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = () => (`
    <section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>
  `);

export default class FooterStatistics extends AbstractStatefulView {
  get template() {
    return createTemplate();
  }
}
