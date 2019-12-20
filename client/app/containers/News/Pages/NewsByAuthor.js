import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  makeSelectLoading,
  makeSelectNewsByAuthor,
  makeSelectQuery,
} from '../selectors';
import * as mapDispatchToProps from '../actions';
import RenderNews from '../components/NewsList';
import CategoryList from '../components/CategoryList';
import Archives from '../components/Archives';

/* eslint-disable react/prefer-stateless-function */
export class NewsByAuthor extends React.Component {
  static propTypes = {
    loadNewsByAuthorRequest: PropTypes.func.isRequired,
    newsByAuthor: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.props.match.params.author) {
      this.props.loadNewsByAuthorRequest({
        key: this.props.match.params.author,
        value: '',
      });
    }
  }

  handlePagination = paging => {
    this.props.loadNewsByAuthorRequest({
      key: this.props.match.params.author,
      value: paging,
    });
  };

  render() {
    const {
      newsByAuthor: { data, page, size, totaldata },
      loading,
    } = this.props;
    const pagination = { page, size, totaldata };

    return (
      <React.Fragment>
        <Helmet>
          <title>News By Author</title>
        </Helmet>
        <div className="bg-star h-48 relative text-center py-12">
          <h1 className="mb-4 text-gray-700 text-4xl font-bold">
            {data &&
              data.length > 0 &&
              data[0].author &&
              `News By ${data[0].author.name}`}
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
  newsByAuthor: makeSelectNewsByAuthor(),
  loading: makeSelectLoading(),
  query: makeSelectQuery(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(NewsByAuthor);
