/**
 *
 * Asynchronously loads the component for NewsPage
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import Loading from 'components/Loading';

export const NewsList = loadable(() => import('./NewsList'), {
  fallback: <Loading />,
});
export const NewsByAuthor = loadable(() => import('./NewsByAuthor'), {
  fallback: <Loading />,
});
export const NewsByTag = loadable(() => import('./NewsByTag'), {
  fallback: <Loading />,
});
export const NewsDetail = loadable(() => import('./NewsDetail'), {
  fallback: <Loading />,
});

export const CategoryDetail = loadable(() => import('./CategoryDetail'), {
  fallback: <Loading />,
});
export const NewsDate = loadable(() => import('./NewsDate'), {
  fallback: <Loading />,
});
