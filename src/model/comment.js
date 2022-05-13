import createComment from '../fish/comment';

export default class CommentModel {
  #comments;

  constructor() {
    this.#comments = createComment();
  }

  get comments() {
    return this.#comments;
  }
}
