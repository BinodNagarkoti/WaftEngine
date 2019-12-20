import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import * as mapDispatchToProps from '../actions';
import {
  makeSelectNewsOfCat,
  makeSelectLoadingNewsOfCat,
  makeSelectCategoryTitle,
} from '../selectors';
import CategoryList from '../components/CategoryList';
import RenderNews from '../components/NewsList';
import Archives from '../components/Archives';

class CategoryDetailPage extends React.Component {
  componentDidMount() {
    const {
      params: { slug_url },
    } = this.props.match;
    this.props.loadNewsOfCatRequest({ key: slug_url, value: '' });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    window.scrollTo(0, 0);
    if (this.props.match.params.slug_url !== nextProps.match.params.slug_url) {
      this.props.loadNewsOfCatRequest({
        key: nextProps.match.params.slug_url,
        value: '',
      });
    }
  }

  componentWillUnmount() {
    this.props.clearNews();
  }

  handlePagination = paging => {
    this.props.loadNewsOfCatRequest({
      key: this.props.match.params.slug_url,
      value: paging,
    });
  };

  render() {
    const {
      news: { data, page, size, totaldata },
      loading,
      title,
      match: {
        params: { slug_url },
      },
    } = this.props;
    const pagination = { page, size, totaldata };
    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className="bg-star h-48 relative text-center py-12">
          <h1 className="mb-4 text-gray-700 text-4xl font-bold">
            {!loading && `News related to ${title}`}
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

CategoryDetailPage.propTypes = {
  loadNewsRequest: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  news: makeSelectNewsOfCat(),
  loading: makeSelectLoadingNewsOfCat(),
  title: makeSelectCategoryTitle(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(CategoryDetailPage);
