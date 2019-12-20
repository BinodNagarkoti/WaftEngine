import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRelatedNewsIsLoading,
  makeSelectRelatedNews,
} from '../selectors';
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
import RecentNewsSkeleton from '../Skeleton/RecentNews';

function RelatedNews(props) {
  if (props.loading) {
    return <RecentNewsSkeleton />;
  }
  // if (props.news.length === 0) {
  //   return null;
  // }
  return (
    <div className="mt-10 mb-4">
      <h3 className="font-medium text-xl uppercase">Related News</h3>
      {props.news.map(news => (
        <div
          key={`relateds-${news._id}`}
          className="news-det flex py-3 border-b border-dashed"
        >
          <div style={{ width: '80px', height: '80px' }}>
            <Link to={`/news/${news.slug_url}`}>
              <img
                src={`${IMAGE_BASE}${news.image.path}`}
                alt="news image"
                className="mr-4"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
            </Link>
          </div>
          <div className="flex-1 ml-4">
            <h4 className="font-bold">
              <Link
                className="text-black no-underline hover:text-waftprimary"
                to={`/news/${news.slug_url}`}
              >
                {news.title}
              </Link>
            </h4>
            <time>{moment(news.added_at).format(DATE_FORMAT)}</time>
          </div>
        </div>
      ))}
    </div>
  );
}

RelatedNews.propTypes = {
  loading: PropTypes.bool.isRequired,
  news: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectRelatedNewsIsLoading(),
  news: makeSelectRelatedNews(),
});

export default connect(mapStateToProps)(RelatedNews);
