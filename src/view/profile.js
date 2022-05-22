import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = () => (`
    <section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `);

export default class Profile extends AbstractStatefulView {
  get template() {
    return createTemplate();
  }
}
