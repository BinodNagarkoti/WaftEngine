/*
 *
 * NewsManagePage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  chipData: [
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ],

  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  one: {
    title: '',
    slug_url: '',
    category: [],
    description: '',
    summary: '',
    published_on: Date.now(),
    image: null,
    is_published: true,
    is_active: false,
    description: '',
    short_description: '',
    meta_description: '',
    meta_tag: [],
    keywords: [],
    tags: [],
    author: '',
  },
  query: { find_title: '' },
  category: [],
  users: [],
  tempTag: '',
  tempMetaTag: '',
  tempMetaKeyword: '',
  loading: false,
  errors: { title: '', slug_url: '', description: '' },
};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_ONE_VALUE:
        draft.one[action.payload.key] = action.payload.value;
        draft.errors[action.payload.key] = '';
        break;
      case types.CLEAR_ONE:
        draft.one = initialState.one;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;
      case types.LOAD_ALL_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ALL_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        break;
      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = action.payload.data;
        break;
      case types.LOAD_ONE_FAILURE:
        draft.loading = false;
        break;
      case types.LOAD_CATEGORY_SUCCESS:
        draft.category = action.payload.data;
        break;
      case types.LOAD_USERS_SUCCESS:
        draft.users = action.payload.data;
        break;
      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        break;
      case types.SET_META_TAG_VALUE:
        draft.tempMetaTag = action.payload;
        break;
      case types.SET_META_KEYWORD_VALUE:
        draft.tempMetaKeyword = action.payload;
        break;
      case types.SET_TAG_VALUE:
        draft.tempTag = action.payload;
        break;
      case types.SET_CATEGORY_VALUE:
        draft.one.category = action.payload;
        break;
      case types.CLEAR_ERRORS:
        draft.errors = initialState.errors;
        break;
      case types.SET_ERROR_VALUE:
        draft.errors = action.payload;
        break;
      case types.ADD_EDIT_FAILURE:
        draft.errors = action.payload.errors;
        break;
    }
  });

export default reducer;
