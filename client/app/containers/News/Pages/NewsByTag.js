import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  makeSelectLoading,
  makeSelectNewsByTag,
  makeSelectQuery,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
// import Loading from '../../components/Loading';
import RenderNews from '../components/NewsList';
import CategoryList from '../components/CategoryList';
import Archives from '../components/Archives';

/* eslint-disable react/prefer-stateless-function */
export class NewsByTag extends React.Component {
  static propTypes = {
    loadNewsByTagRequest: PropTypes.func.isRequired,
    newsByTag: PropTypes.object,
  };

  componentDidMount() {
    if (this.props.match.params.tag) {
      this.props.loadNewsByTagRequest({
        key: this.props.match.params.tag,
        value: '',
      });
    }
  }

  handlePagination = paging => {
    this.props.loadNewsListRequest({
      key: this.props.match.params.tag,
      value: paging,
    });
  };

  render() {
    const {
      newsByTag: { data, page, size, totaldata },
      loading,
      match: {
        params: { tag },
      },
    } = this.props;
    const pagination = { page, size, totaldata };

    return (
      <React.Fragment>
        <Helmet>
          <title>News By Tag</title>
        </Helmet>
        <div className="bg-star h-48 relative text-center py-12">
          <h1 className="mb-4 text-gray-700 text-4xl font-bold">
            News Of {tag}
          </h1>
        </div>
        <div className="container mx-auto md:flex py-10">
          <div className="md:w-3/4 px-5">
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
  newsByTag: makeSelectNewsByTag(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(NewsByTag);
