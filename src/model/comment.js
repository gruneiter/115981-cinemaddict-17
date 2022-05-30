import createComment from '../fish/comment';
import data from '../fish/data.json';
const { id } = data.comment;

export default class CommentModel {
  #comments = [];

  constructor() {
    id.forEach((i) => this.#comments.push(createComment(i)));
  }

  get comments() {
    return this.#comments;
  }
}
