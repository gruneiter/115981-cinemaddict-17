import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createTemplate = (data) => {
  const {commentIds} = data;
  let commentsCurrent = [];
  commentIds.forEach((id) => {
    commentsCurrent.push(data.comments.find((item) => item.id === id));
  });
  commentsCurrent = commentsCurrent.filter((comment) => comment !== undefined);
  return `
    <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${ commentsCurrent.length }</span></h3>

    <ul class="film-details__comments-list"></ul>
  </section>
  `;
};

export default class CommentsView extends AbstractStatefulView {

  #comments;

  constructor(commentIds, comments) {
    super();
    this.#comments = comments;
    this._state = { comments: this.#comments, commentIds };
  }

  get template() {
    return createTemplate(this._state);
  }
}