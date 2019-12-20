import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDomain = state => state.NewsPage || initialState;

export const makeSelectNews = () =>
  createSelector(
    selectDomain,
    state => state.News,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectDomain,
    state => state.loading,
  );

export const makeSelectRelatedNews = () =>
  createSelector(
    selectDomain,
    state => state.relatedNews,
  );

export const makeSelectRelatedNewsIsLoading = () =>
  createSelector(
    selectDomain,
    state => state.relatedNewsIsLoading,
  );

export const makeSelectRecentNews = () =>
  createSelector(
    selectDomain,
    state => state.recentNews,
  );

export const makeSelectArchives = () =>
  createSelector(
    selectDomain,
    state => state.archives,
  );

export const makeSelectRecentNewsIsLoading = () =>
  createSelector(
    selectDomain,
    state => state.recentNewsIsLoading,
  );

export const makeSelectOne = () =>
  createSelector(
    selectDomain,
    state => state.one,
  );

export const makeSelectArchiveLoading = () =>
  createSelector(
    selectDomain,
    state => state.archiveLoading,
  );

export const makeSelectNewsList = () =>
  createSelector(
    selectDomain,
    state => state.NewsList,
  );

export const makeSelectNewsByAuthor = () =>
  createSelector(
    selectDomain,
    state => state.NewsByAuthor,
  );

export const makeSelectNewsByTag = () =>
  createSelector(
    selectDomain,
    state => state.NewsByTag,
  );

export const makeSelectNewsDate = () =>
  createSelector(
    selectDomain,
    state => state.NewsDate,
  );

export const makeSelectDateLoading = () =>
  createSelector(
    selectDomain,
    state => state.dateLoading,
  );

export const makeSelectQuery = () =>
  createSelector(
    selectDomain,
    state => state.query,
  );

export const makeSelectCategory = () =>
  createSelector(
    selectDomain,
    state => state.category,
  );

export const makeSelectCategoryLoading = () =>
  createSelector(
    selectDomain,
    state => state.catLoading,
  );

export const makeSelectNewsOfCat = () =>
  createSelector(
    selectDomain,
    state => state.NewsOfCat,
  );

export const makeSelectLoadingNewsOfCat = () =>
  createSelector(
    selectDomain,
    state => state.loadingNewsOfCat,
  );
export const makeSelectCategoryTitle = () =>
  createSelector(
    selectDomain,
    state => state.categoryTitle,
  );
