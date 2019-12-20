import * as types from './constants';

export const clearData = payload => ({
  type: types.CLEAR_DATA,
  payload,
});
export const loadNewsRequest = payload => ({
  type: types.LOAD_NEWS_REQUEST,
  payload,
});
export const loadNewsSuccess = payload => ({
  type: types.LOAD_NEWS_SUCCESS,
  payload,
});
export const loadNewsFailure = payload => ({
  type: types.LOAD_NEWS_FAILURE,
  payload,
});
export const loadRelatedNewsRequest = payload => ({
  type: types.LOAD_RELATED_NEWSS_REQUEST,
  payload,
});
export const loadRelatedNewsSuccess = payload => ({
  type: types.LOAD_RELATED_NEWSS_SUCCESS,
  payload,
});
export const loadRelatedNewsFailure = payload => ({
  type: types.LOAD_RELATED_NEWSS_FAILURE,
  payload,
});

export const loadRecentNewsRequest = payload => ({
  type: types.LOAD_RECENT_NEWSS_REQUEST,
  payload,
});
export const loadRecentNewsSuccess = payload => ({
  type: types.LOAD_RECENT_NEWSS_SUCCESS,
  payload,
});
export const loadRecentNewsFailure = payload => ({
  type: types.LOAD_RECENT_NEWSS_FAILURE,
  payload,
});
export const setOneValue = payload => ({
  type: types.SET_ONE_VALUE,
  payload,
});

export const clearOne = payload => ({
  type: types.CLEAR_ONE,
  payload,
});

export const loadArchivesRequest = payload => ({
  type: types.LOAD_ARCHIVES_REQUEST,
  payload,
});
export const loadArchivesSuccess = payload => ({
  type: types.LOAD_ARCHIVES_SUCCESS,
  payload,
});
export const loadArchivesFailure = payload => ({
  type: types.LOAD_ARCHIVES_FAILURE,
  payload,
});

export const loadNewsListRequest = payload => ({
  type: types.LOAD_NEWS_LIST_REQUEST,
  payload,
});
export const loadNewsListSuccess = payload => ({
  type: types.LOAD_NEWS_LIST_SUCCESS,
  payload,
});
export const loadNewsListFailure = payload => ({
  type: types.LOAD_NEWS_LIST_FAILURE,
  payload,
});
export const setPagesValue = payload => ({
  type: types.SET_PAGES_VALUE,
  payload,
});

export const setSizeValue = payload => ({
  type: types.SET_SIZE_VALUE,
  payload,
});

export const loadNewsByAuthorRequest = payload => ({
  type: types.LOAD_NEWS_BY_AUTHOR_REQUEST,
  payload,
});
export const loadNewsByAuthorSuccess = payload => ({
  type: types.LOAD_NEWS_BY_AUTHOR_SUCCESS,
  payload,
});
export const loadNewsByAuthorFailure = payload => ({
  type: types.LOAD_NEWS_BY_AUTHOR_FAILURE,
  payload,
});
export const loadNewsByTagRequest = payload => ({
  type: types.LOAD_NEWS_BY_TAG_REQUEST,
  payload,
});
export const loadNewsByTagSuccess = payload => ({
  type: types.LOAD_NEWS_BY_TAG_SUCCESS,
  payload,
});
export const loadNewsByTagFailure = payload => ({
  type: types.LOAD_NEWS_BY_TAG_FAILURE,
  payload,
});
export const loadNewsDateRequest = payload => ({
  type: types.LOAD_NEWS_DATE_REQUEST,
  payload,
});
export const loadNewsDateSuccess = payload => ({
  type: types.LOAD_NEWS_DATE_SUCCESS,
  payload,
});
export const loadNewsDateFailure = payload => ({
  type: types.LOAD_NEWS_DATE_FAILURE,
  payload,
});

export const loadCategoryRequest = payload => ({
  type: types.LOAD_CATEGORY_REQUEST,
  payload,
});
export const loadCategorySuccess = payload => ({
  type: types.LOAD_CATEGORY_SUCCESS,
  payload,
});
export const loadCategoryFailure = payload => ({
  type: types.LOAD_CATEGORY_FAILURE,
  payload,
});

export const loadNewsOfCatRequest = payload => ({
  type: types.LOAD_NEWS_OF_CAT_REQUEST,
  payload,
});
export const loadNewsOfCatSuccess = payload => ({
  type: types.LOAD_NEWS_OF_CAT_SUCCESS,
  payload,
});
export const loadNewsOfCatFailure = payload => ({
  type: types.LOAD_NEWS_OF_CAT_FAILURE,
  payload,
});

export const clearNews = () => ({
  type: types.CLEAR_NEWS,
});
