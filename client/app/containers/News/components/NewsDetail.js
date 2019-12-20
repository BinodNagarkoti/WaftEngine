import React, { useState } from 'react';
import moment from 'moment';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  FacebookShareCount
} from 'react-share';

import Dialog from '@material-ui/core/Dialog';
import LinkBoth from '../../../components/LinkBoth';
import { IMAGE_BASE,DATE_FORMAT } from '../../App/constants';
import NewsDetailSkeleton from '../Skeleton/NewsDetail';
import NewsComments from '../../Comments';

// @material
// import DialogTitle from '@material-ui/core/DialogTitle';

function NewsDetail(props) {
  const { news, loading } = props;
  const url = window.location.href;
  return loading ? (
    <NewsDetailSkeleton />
  ) : (
      <>
        <div>

          <p className="text-gray-700">
            {news && moment(news.added_at).format(DATE_FORMAT)}
          </p>
          <h2 className="capitalize text-4xl mb-2 leading-tight">{news.title}</h2>

          {news && news.author && (
            <div className="inline-block">
              <span>Written by </span>
              {/* <img src={`${news.author.avatar}`} alt={`${news.author.name}`} /> */}
              <LinkBoth
                className="text-red-600 underline leading-normal text-sm capitalize"
                to={`/news/author/${news.author._id}`}
              >
                {news.author.name}
              </LinkBoth>
            </div>
          )}

          {news && news.category && news.category.length > 0 && (
            <div className="inline-block border-l border-gray-600 ml-2 pl-2">
              {news.category.map((each, index) => (
                <LinkBoth
                  className="text-blue-700 hover:text-indigo-800 leading-normal text-sm no-underline capitalize"
                  key={index}
                  to={`/news/category/${each.slug_url}`}
                >
                  {`${index === 0 ? '' : ', '}${each.title}`}
                </LinkBoth>
              ))}
            </div>
          )}

          <div className="flex items-center py-4">
            <FacebookShareButton className="ml-2" url={url}>
              <FacebookIcon size={36} round />
            </FacebookShareButton>
            <span className="inline-block ml-1 bg-gray-200 rounded border w-8 h-8 text-center text-blue-700 leading-relaxed"> <FacebookShareCount url={url} /></span>
            <LinkedinShareButton className="ml-2" url={url}>
              <LinkedinIcon size={36} round />
            </LinkedinShareButton>
            <TwitterShareButton className="ml-2" url={url}>
              <TwitterIcon size={36} round />
            </TwitterShareButton>
            <EmailShareButton className="ml-2" url={url}>
              <EmailIcon size={36} round />
            </EmailShareButton>
            <WhatsappShareButton className="ml-2" url={url}>
              <WhatsappIcon size={36} round />
            </WhatsappShareButton>
          </div>

          <div className="news_img">
            {news && news.image && news.image.fieldname ? (
              <img
                src={`${IMAGE_BASE}${news.image.path}`}
                className="object-cover"
                alt={`${news.title}`}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                }}
              />
            ) : null}
          </div>
          <div
            className="text-lg leading-relaxed py-5"
            dangerouslySetInnerHTML={{ __html: news.description }}
          />

          {news && news.tags && news.tags.length > 0 && (
            <div className="inline-block mb-5">
              {news.tags.map((each, index) => (
                <LinkBoth
                  className="bg-gray-300 hover:bg-blue-500 hover:text-white leading-normal text-sm no-underline rounded px-2 py-1 mr-2"
                  key={index}
                  to={`/news/tag/${each}`}
                >
                  {`${index === 0 ? '' : ''}${each}`}
                </LinkBoth>
              ))}
            </div>
          )}
        </div>
        {news && <NewsComments news_id={news._id} />}
      </>
    );
}

export default NewsDetail;
