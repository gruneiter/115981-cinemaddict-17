import createComment from "../fish/comment";

export default class CommentModel {
  constructor() {
    this.comments = createComment(4);
  }

  getMovies = () => this.comments;
}
