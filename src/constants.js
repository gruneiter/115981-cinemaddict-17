export const COMMENTS_COUNT = 4;
export const MOVIES_COUNT = 22;
export const MOVIES_COUNT_ROW = 5;
export const MOVIES_COUNT_TOP = 2;
export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
  COMMENTS: 'comments',
};

export const UserAction = {
  UPDATE_FILM: 'update film',
  ADD_COMMENT: 'add comment',
  DELETE_COMMENT: 'delete comment',
};

export const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
};

export const FilterType = {
  ALL: 'all',
  WATCH_LIST:'watchlist',
  ALREADY_WATCHED:'history',
  FAVORITE:'favorites',
};
