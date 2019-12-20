import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRecentNewsIsLoading,
  makeSelectRecentNews,
} from '../selectors';
import { IMAGE_BASE, DATE_FORMAT } from '../../App/constants';
import RecentNewsSkeleton from '../Skeleton/RecentNews';

function RecentNews(props) {
  if (props.loading) {
    return <RecentNewsSkeleton />;
  }
  return (
    <div className="mb-4">
      <h3 className="font-medium text-xl uppercase">Recent News</h3>
      {props.news.map(news => (
        <div
          key={`recents-${news._id}`}
          className="news-det flex py-3 border-b border-dotted"
        >
          <div style={{ width: '80px', height: '80px' }}>
            <Link to={`/news/${news.slug_url}`}>
              <img
                src={`${IMAGE_BASE}${news && news.image && news.image.path}`}
                alt="news image"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Link>
          </div>
          <div className="flex-1 ml-4">
            <time className="text-xs text-gray-700">
              {moment(news.added_at).format(DATE_FORMAT)}
            </time>
            <h4 className="font-normal sans-serif text-sm">
              <Link
                className="text-black no-underline hover:text-waftprimary"
                to={`/news/${news.slug_url}`}
              >
                {news.title}
              </Link>
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

RecentNews.propTypes = {
  loading: PropTypes.bool.isRequired,
  news: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectRecentNewsIsLoading(),
  news: makeSelectRecentNews(),
});

export default connect(mapStateToProps)(RecentNews);
