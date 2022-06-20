import Observable from '../framework/observable';
import {UpdateType} from '../constants';
import {adaptToClient} from '../helpers';

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
    this._notify(UpdateType.INIT, this.#movie);
  };

  addComment = async (updateType, comment) => {
    try {
      const response = await this.#moviesApiService.addComment(this.#movie, comment);
      this.#comments = [...response.comments];
      this._notify(updateType, this.#adaptToClient(response.movie));
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  };

  deleteComment = async (updateType, deletedComment) => {
    const index = this.#comments.findIndex((comment) => comment.id === deletedComment.id);
    try {
      await this.#moviesApiService.deleteComment(deletedComment);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
      this._notify(updateType, this.#movie);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };

  #adaptToClient = adaptToClient;
}
