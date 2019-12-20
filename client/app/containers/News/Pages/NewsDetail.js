/**
 *
 * NewsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import * as mapDispatchToProps from '../actions';
import { makeSelectNews, makeSelectLoading } from '../selectors';
import { makeSelectUser } from '../../App/selectors';
import RecentNews from '../components/RecentNews';
import RelatedNews from '../components/RelatedNews';
import Archives from '../components/Archives';
import NewsDetail from '../components/NewsDetail';

export class NewsPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadNewsRequest: PropTypes.func.isRequired,
    loadRecentNewsRequest: PropTypes.func.isRequired,
    news: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        slug_url: PropTypes.string,
      }),
    }).isRequired,
  };

  componentDidMount() {
    this.props.clearOne();
    this.props.loadRecentNewsRequest();
    this.props.loadRelatedNewsRequest(this.props.match.params.slug_url);
    this.props.loadNewsRequest(this.props.match.params.slug_url);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.slug_url !== this.props.match.params.slug_url) {
      this.props.loadRelatedNewsRequest(nextProps.match.params.slug_url);
      this.props.loadNewsRequest(nextProps.match.params.slug_url);
    }
  }

  render() {
    const {
      news,
      loading,
      match: { url },
    } = this.props;
    return (
      <>
        <Helmet>
          <title>{news && news.title}</title>
        </Helmet>
        <div className="container mx-auto my-10 px-5">
          <div className="flex flex-wrap w-full lg:-mx-5">
            <div className="w-full flex-1 lg:px-5">
              <NewsDetail news={news} loading={loading} />
            </div>
            <div className="w-full mt-4 lg:mt-0 lg:w-1/4 p-3">
              <RecentNews />
              <RelatedNews />
              <Archives />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  news: makeSelectNews(),
  loading: makeSelectLoading(),
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(NewsPage);
