import createComment from '../fish/comment';

export default class CommentModel {
  constructor() {
    this.comments = createComment();
  }

  getMovies = () => this.comments;
}
