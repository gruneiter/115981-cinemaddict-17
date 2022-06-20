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
  NONE: 'none',
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'init',
  DELETE: 'delete',
};

export const FilterType = {
  ALL: 'all',
  WATCH_LIST:'watchlist',
  ALREADY_WATCHED:'history',
  FAVORITE:'favorites',
};

export const TimeLimit = {
  LOWER_LIMIT: 0,
  UPPER_LIMIT: 100,
};
