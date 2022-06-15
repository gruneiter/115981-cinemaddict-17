import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = (title, extra) => (`
    <section class="films-list ${ extra ? ' films-list--extra' : '' }">
      <h2 class="films-list__title${ title.hidden ? ' visually-hidden' : '' }">${title.name}</h2>
      <div class="films-list__container">

      </div>
    </section>
  `);


export default class FilmsListView extends AbstractStatefulView {
  #title;
  #extra;

  constructor(title, extra) {
    super();
    this.#title = title;
    this.#extra = extra;
  }

  get template() {
    return createTemplate(this.#title, this.#extra);
  }
}
