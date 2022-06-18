import Observable from '../framework/observable';
import {UpdateType} from '../constants';

export default class CommentModel extends Observable {
  #comments = [];
  #moviesApiService = null;
  #movie = null;

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (movie) => {
    this.#movie = movie;
    try {
      this.#comments = await this.#moviesApiService.getComments(movie);
    } catch(err) {
      this.#comments = [];
    }
    this._notify(UpdateType.INIT, this.#comments);
  };

  addComment = (updateType, updatedComment) => {
    this.#comments = [
      updatedComment,
      ...this.#comments
    ];

    this._notify(updateType, updatedComment);
  };

  deleteComment = (updateType, updatedComment) => {
    const index = this.#comments.findIndex((comment) => comment.id === updatedComment.id);
    if(index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }
    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, updatedComment);
  };
}
