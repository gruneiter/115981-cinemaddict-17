import createComment from '../fish/comment';
import data from '../fish/data.json';
import Observable from '../framework/observable';

const { id } = data.comment;

export default class CommentModel extends Observable {
  #comments = [];

  constructor() {
    super();
    id.forEach((i) => this.#comments.push(createComment(i)));
  }

  get comments() {
    return this.#comments;
  }

  deleteComment = (updateType, update, updatedComment) => {
    const index = this.#comments.findIndex((comment) => comment.id === updatedComment.id);
    if(index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }
    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
