import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  NewsDetail,
  NewsList,
  NewsByAuthor,
  NewsByTag,
  NewsDate,
  CategoryDetail,
} from './Pages/Loadable';

import reducer from './reducer';
import saga from './saga';
import style from './newsLayout.css';

const key = 'newsPage';

const News = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <Switch>
      <Route exact path="/news" component={NewsList} />
      <Route exact path="/news/:slug_url" component={NewsDetail} />
      <Route exact path="/news/category/:slug_url" component={CategoryDetail} />
      <Route exact path="/news/tag/:tag" component={NewsByTag} />
      <Route exact path="/news/author/:author" component={NewsByAuthor} />
      <Route exact path="/news/date/:date" component={NewsDate} />
    </Switch>
  );
};

export default News;
