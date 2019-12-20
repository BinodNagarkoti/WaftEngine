import produce from 'immer';
import * as types from './constants';

export const initialState = {
  news: {},
  loading: false,
  relatedNews: [],
  relatedNewsIsLoading: false,
  recentNews: [],
  recentNewsIsLoading: false,
  archives: [],
  archiveLoading: false,
  newsList: {
    data: [],
    page: 1,
    size: 12,
    totaldata: 0,
  },
  newsByAuthor: {
    data: [],
    page: 1,
    size: 12,
    totaldata: 0,
  },
  newsByTag: {
    data: [],
    page: 1,
    size: 12,
    totaldata: 0,
  },
  newsDate: {
    data: [],
    page: 1,
    size: 12,
    totaldata: 0,
  },
  dateLoading: false,
  query: { size: 12, page: 1 },
  category: [],
  categoryTitle: '',
  news: [],
  catLoading: false,

  newsOfCat: {
    data: [],
    page: 1,
    size: 12,
    totaldata: 0,
  },
  loadingNewsOfCat: true,
};

/* eslint-disable default-case, no-param-reassign */
const newsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_NEWS_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_NEWS_SUCCESS:
        draft.loading = false;
        draft.news = action.payload.data;
        break;
      case types.LOAD_NEWS_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_RELATED_NEWS_REQUEST:
        draft.relatedNewsIsLoading = true;
        break;
      case types.LOAD_RELATED_NEWS_SUCCESS:
        draft.relatedNewsIsLoading = false;
        draft.relatedNews = action.payload.data;
        break;
      case types.LOAD_RELATED_NEWS_FAILURE:
        draft.relatedNewsIsLoading = false;
        break;
      case types.LOAD_RECENT_NEWS_REQUEST:
        draft.recentNewsIsLoading = true;
        break;
      case types.LOAD_RECENT_NEWS_SUCCESS:
        draft.recentNewsIsLoading = false;
        draft.recentNews = action.payload.data;
        break;
      case types.LOAD_RECENT_NEWS_FAILURE:
        draft.recentNewsIsLoading = false;
        break;
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        break;
      case types.LOAD_ARCHIVES_REQUEST:
        draft.archiveLoading = true;
        break;
      case types.LOAD_ARCHIVES_SUCCESS:
        draft.archiveLoading = false;
        draft.archives = action.payload.data;
        break;
      case types.LOAD_ARCHIVES_FAILURE:
        draft.archiveLoading = false;
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.LOAD_NEWS_LIST_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_NEWS_DATE_REQUEST:
        draft.dateLoading = true;
        break;
      case types.LOAD_NEWS_DATE_SUCCESS:
        draft.dateLoading = false;
        draft.newsDate = action.payload;
        break;
      case types.LOAD_NEWS_DATE_FAILURE:
        draft.dateLoading = false;
        break;
      case types.LOAD_NEWS_LIST_SUCCESS:
        draft.newsList = action.payload;
        draft.loading = false;
        break;
      case types.LOAD_NEWS_LIST_FAILURE:
        draft.loading = false;
        break;
      case types.SET_PAGES_VALUE:
        draft.newsList[action.payload.key] = action.payload.value;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.SET_SIZE_VALUE:
        draft.newsList.size = action.payload;
        draft.newsList.page = 1;
        break;
      case types.LOAD_NEWS_BY_AUTHOR_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_NEWS_BY_AUTHOR_SUCCESS:
        draft.newsByAuthor = action.payload;
        draft.loading = false;
        break;
      case types.LOAD_NEWS_BY_AUTHOR_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_NEWS_BY_TAG_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_NEWS_BY_TAG_SUCCESS:
        draft.newsByTag = action.payload;
        draft.loading = false;
        break;
      case types.LOAD_NEWS_BY_TAG_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_CATEGORY_REQUEST:
        draft.catLoading = true;
        break;
      case types.LOAD_CATEGORY_SUCCESS:
        draft.category = action.payload.data;
        draft.catLoading = false;
        break;
      case types.LOAD_CATEGORY_FAILURE:
        draft.catLoading = false;
        break;
      case types.LOAD_NEWS_OF_CAT_FAILURE:
        draft.loadingNewsOfCat = false;
        break;
      case types.LOAD_NEWS_OF_CAT_REQUEST:
        draft.categoryTitle = '';
        draft.loadingNewsOfCat = true;
        draft.newsOfCat = initialState.newsOfCat;
        break;
      case types.LOAD_NEWS_OF_CAT_SUCCESS:
        draft.categoryTitle = action.payload.msg;
        draft.newsOfCat = action.payload;
        draft.loadingNewsOfCat = false;
        break;
      case types.CLEAR_NEWS:
        draft.newsOfCat = initialState.newsOfCat;
        draft.loadingNewsOfCat = true;
        break;
      case types.CLEAR_DATA:
        draft.newsList.data = initialState.newsList.data;
        draft.newsList.page = initialState.newsList.page;
        draft.newsList.size = initialState.newsList.size;
        draft.newsList.totaldata = initialState.newsList.totaldata;
        break;
    }
  });

export default newsPageReducer;
