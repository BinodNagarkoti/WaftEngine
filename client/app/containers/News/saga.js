import { takeLatest, call, select } from 'redux-saga/effects';
import Api from 'utils/Api';
import { makeSelectToken } from '../App/selectors';
import * as types from './constants';
import * as actions from './actions';

function* loadNews({ payload }) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `news/news/${payload}`,
      actions.loadNewsSuccess,
      actions.loadNewsFailure,
      token,
    ),
  );
}

function* loadRecentNews() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `news/latest`,
      actions.loadRecentNewsSuccess,
      actions.loadRecentNewsFailure,
      token,
    ),
  );
}

function* loadRelatedNews(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `news/related/${action.payload}`,
      actions.loadRelatedNewsSuccess,
      actions.loadRelatedNewsFailure,
      token,
    ),
  );
}

function* loadArchives(action) {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `news/newsbytime`,
      actions.loadArchivesSuccess,
      actions.loadArchivesFailure,
      token,
    ),
  );
}

function* loadNewsList(action) {
  let query = '';
  if (action.payload) {
    Object.keys(action.payload).map(each => {
      query = `${query}&${each}=${action.payload[each]}`;
    });
  }
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      `news?${query}`,
      actions.loadNewsListSuccess,
      actions.loadNewsListFailure,
      token,
    ),
  );
}

function* loadNewsByAuthor(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map(each => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `news/newsbyauthor/${action.payload.key}?${query}`,
      actions.loadNewsByAuthorSuccess,
      actions.loadNewsByAuthorFailure,
      token,
    ),
  );
}

function* loadNewsByTag(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map(each => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `news/newsbytag/${action.payload.key}?${query}`,
      actions.loadNewsByTagSuccess,
      actions.loadNewsByTagFailure,
      token,
    ),
  );
}

function* loadNewsDate(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map(each => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `news/newsbytime/${action.payload.key}?${query}`,
      actions.loadNewsDateSuccess,
      actions.loadNewsDateFailure,
      token,
    ),
  );
}
function* loadCategory() {
  const token = yield select(makeSelectToken());
  yield call(
    Api.get(
      'news/category',
      actions.loadCategorySuccess,
      actions.loadCategoryFailure,
      token,
    ),
  );
}
function* loadNewsOfCat(action) {
  const token = yield select(makeSelectToken());
  let query = '';
  if (action.payload.value) {
    Object.keys(action.payload.value).map(each => {
      query = `${query}&${each}=${action.payload.value[each]}`;
    });
  }
  yield call(
    Api.get(
      `news/newsbycat/${action.payload.key}?${query}`,
      actions.loadNewsOfCatSuccess,
      actions.loadNewsOfCatFailure,
      token,
    ),
  );
}

export default function* defaultSaga() {
  yield takeLatest(types.LOAD_NEWS_REQUEST, loadNews);
  yield takeLatest(types.LOAD_RECENT_NEWS_REQUEST, loadRecentNews);
  yield takeLatest(types.LOAD_RELATED_NEWS_REQUEST, loadRelatedNews);
  yield takeLatest(types.LOAD_ARCHIVES_REQUEST, loadArchives);

  yield takeLatest(types.LOAD_NEWS_LIST_REQUEST, loadNewsList);
  yield takeLatest(types.LOAD_NEWS_BY_AUTHOR_REQUEST, loadNewsByAuthor);
  yield takeLatest(types.LOAD_NEWS_BY_TAG_REQUEST, loadNewsByTag);
  yield takeLatest(types.LOAD_NEWS_DATE_REQUEST, loadNewsDate);
  yield takeLatest(types.LOAD_CATEGORY_REQUEST, loadCategory);
  yield takeLatest(types.LOAD_NEWS_OF_CAT_REQUEST, loadNewsOfCat);
}
