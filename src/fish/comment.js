import data from './data.json';
import { getRandomItem } from '../helpers';

const { comment } = data;

const createComment = () => ({
  id: getRandomItem(comment.id),
  author: getRandomItem(comment.author),
  comment: getRandomItem(comment.comment),
  date: '2019-05-11T16:12:32.554Z',
  emotion: getRandomItem(comment.emotions),
});

export default createComment;
