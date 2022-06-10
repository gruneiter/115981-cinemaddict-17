import data from './data.json';
import { getRandomItem } from '../helpers';
import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';

dayjs.extend(dayjsRandom);

const { comment } = data;

const createComment = (id) => ({
  id,
  author: getRandomItem(comment.author),
  comment: getRandomItem(comment.comment),
  date: dayjs.between('2010-01-01', Date.now()),
  emotion: getRandomItem(comment.emotions),
});

export default createComment;
