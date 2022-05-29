import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const getRank = (rating) => {
  let res;
  if (rating >= 0) { res = ''; }
  if (rating > 0 && rating <= 10) { res = 'novice'; }
  if (rating > 10 && rating <= 20) { res = 'fan'; }
  if (rating > 20) { res = 'movie buff'; }
  return res;
};

const createTemplate = (rating) => (`
    <section class="header__profile profile">
      <p class="profile__rating">${ getRank(rating) }</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `);

export default class Profile extends AbstractStatefulView {
  constructor(rating) {
    super();
    this.rating = rating;
  }

  get template() {
    if (this.rating <= 0) { return 'test'; }
    else {
      return createTemplate(this.rating);
    }
  }
}
