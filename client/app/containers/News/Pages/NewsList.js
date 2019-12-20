import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  makeSelectNewsList,
  makeSelectLoading,
  makeSelectQuery,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
// import Loading from '../../components/Loading';
import RenderNews from '../components/NewsList';
import CategoryList from '../components/CategoryList';
import Archives from '../components/Archives';

/* eslint-disable react/prefer-stateless-function */
export class NewsListPage extends React.Component {
  static propTypes = {
    loadNewsListRequest: PropTypes.func.isRequired,
    newsList: PropTypes.object,
  };

  componentDidMount() {
    this.props.loadNewsListRequest();
  }

  handlePagination = paging => {
    this.props.loadNewsListRequest(paging);
  };

  render() {
    const {
      newsList: { data, page, size, totaldata },
      loading,
    } = this.props;
    const pagination = { page, size, totaldata };

    return (
      <React.Fragment>
        <Helmet>
          <title>News List</title>
        </Helmet>
        <div className="bg-star h-48 relative text-center py-12">
          <h1 className="mb-4 text-gray-700 text-4xl font-bold">News</h1>
        </div>
        <div className="container mx-auto md:flex mb-10 py-10">
          <div className="md:w-3/4 md:px-5">
            <RenderNews
              loading={loading}
              currentNews={data}
              pagination={pagination}
              handlePagination={this.handlePagination}
            />
          </div>
          <div className="md:w-1/4 pt-10 px-5">
            <CategoryList />
            <Archives />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  newsList: makeSelectNewsList(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(NewsListPage);
