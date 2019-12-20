import React from 'react';
import PropTypes, { number } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';

// @material
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectNewsDate, makeSelectDateLoading } from '../selectors';
import saga from '../saga';
import * as mapDispatchToProps from '../actions';
import reducer from '../reducer';
import CategoryList from '../components/CategoryList';
import Archives from '../components/Archives';
import RenderNews from '../components/NewsList';

/* eslint-disable react/prefer-stateless-function */
export class NewsDatePage extends React.Component {
  static propTypes = {
    newsDate: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.loadNewsDateRequest({
      key: this.props.match.params.date,
      value: '',
    });
  }

  componentWillReceiveProps(nextProps) {
    // window.scrollTo(0, 0)
    if (nextProps.match.params.date !== this.props.match.params.date) {
      this.props.loadNewsDateRequest({
        key: nextProps.match.params.date,
        value: '',
      });
    }
  }

  handlePagination = paging => {
    this.props.loadNewsDateRequest({
      key: this.props.match.params.date,
      value: paging,
    });
  };

  render() {
    const {
      newsDate: { data, page, size, totaldata },
      loading,
    } = this.props;
    const pagination = { page, size, totaldata };

    return (
      <React.Fragment>
        <Helmet>
          <title>News By Date</title>
        </Helmet>
        <div className="bg-star h-48 relative text-center py-12">
          <h1 className="mb-4 text-gray-700 text-4xl font-bold">
            {data &&
              data.length > 0 &&
              moment(data[0].added_at).format('MMMM YYYY')}
          </h1>
        </div>
        <div className="container mx-auto md:flex py-10">
          <div className="md:w-3/4 px-5">
            {data && data.length > 0 && (
              <RenderNews
                loading={loading}
                currentNews={data}
                pagination={pagination}
                handlePagination={this.handlePagination}
              />
            )}
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

const withReducer = injectReducer({ key: 'newsList', reducer });
const withSaga = injectSaga({ key: 'newsList', saga });

const mapStateToProps = createStructuredSelector({
  newsDate: makeSelectNewsDate(),
  loading: makeSelectDateLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsDatePage);
