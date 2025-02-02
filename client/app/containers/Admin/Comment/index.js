/**
 *
 * CommentManagePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import moment from 'moment';
import { Helmet } from 'react-helmet';

import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import Table from 'components/Table';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAll, makeSelectQuery, makeSelectLoading } from './selectors';
import * as mapDispatchToProps from './actions';
import reducer from './reducer';
import saga from './saga';
import { DATE_FORMAT } from '../../App/constants';
import Loading from '../../../components/Loading';

import PageHeader from '../../../components/PageHeader/PageHeader';
import PageContent from '../../../components/PageContent/PageContent';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    width: '40px',
    height: '40px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  tableActionButton: {
    padding: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
  },

  waftsrch: {
    padding: 0,
    position: 'absolute',
    borderLeft: '1px solid #d9e3e9',
    borderRadius: 0,
    '&:hover': {
      background: 'transparent',
      color: '#404040',
    },
  },
});

/* eslint-disable react/prefer-stateless-function */
export class BlogCommentManagePage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    loadAllRequest: PropTypes.func.isRequired,
    all: PropTypes.shape({
      data: PropTypes.array.isRequired,
      page: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      totaldata: PropTypes.number.isRequired,
    }),
  };

  componentDidMount() {
    this.props.loadAllRequest(this.props.query);
  }

  handleQueryChange = e => {
    e.persist();
    this.props.setQueryValue({ key: e.target.name, value: e.target.value });
  };

  handleSearch = () => {
    this.props.loadAllRequest(this.props.query);
  };

  handlePagination = paging => {
    this.props.loadAllRequest(paging);
  };

  handleEnter = e => {
    if (e.key === 'Enter') {
      this.props.loadAllRequest(this.props.query);
    }
  };

  handleView = id => {
    this.props.push(`/admin/comment/view/${id}`);
  };

  handleApprove = (id, status) => {
    // this.props.loadApproveRequest(id);
  };

  // handleDisapprove = id => {
  //   this.props.loadDisapproveRequest(id);
  // };

  render() {
    const { classes } = this.props;
    const {
      all: { data, page, size, totaldata },
      query,
      loading,
    } = this.props;
    const tablePagination = { page, size, totaldata };
    const tableData = data.map(
      ({ title, blog_id, status, added_at, updated_at, _id }) => [
        title,
        blog_id && blog_id.title,
        status || 'onhold',
        moment(added_at).format(DATE_FORMAT),
        moment(updated_at).format(DATE_FORMAT),
        <>
          <Tooltip
            id="tooltip-top-start"
            title="View"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              aria-label="Close"
              className={classes.tableActionButton}
              onClick={() => this.handleView(_id)}
            >
              <ViewIcon
                className={`${classes.tableActionButtonIcon} ${classes.view}`}
              />
            </IconButton>
          </Tooltip>
          <button
            className="ml-2 underline text-blue-500"
            onClick={() => this.handleApprove(_id, 'approve')}
          >
            Approve
          </button>
          <button
            className="ml-2 underline text-primary"
            onClick={() => this.handleDisapprove(_id, 'disapprove')}
          >
            Disapprove
          </button>
        </>,
      ],
    );
    return (
      <>
        <Helmet>
          <title>Blog Comments</title>
        </Helmet>
        <div className="flex justify-between mt-3 mb-3">
          {loading && loading == true ? <Loading /> : <></>}
          <PageHeader>Blog Comment Listing</PageHeader>
        </div>
        <PageContent loading={loading}>
          <div className="flex justify-end">
            <div className="flex relative mr-2">
              <input
                type="text"
                name="find_title"
                id="comment-title"
                placeholder="Search Blog Comment"
                className="m-auto inputbox"
                value={query.find_title}
                onChange={this.handleQueryChange}
                onKeyDown={this.handleEnter}
              />
            </div>
            <div className="flex relative mr-2">
              <input
                type="text"
                name="find_blog_id"
                id="blog-of-comment"
                placeholder="Search Blogs"
                className="m-auto inputbox"
                value={query.find_blog_id}
                onChange={this.handleQueryChange}
                onKeyDown={this.handleEnter}
              />
            </div>
            <div className="flex relative mr-2">
              <IconButton
                aria-label="Search"
                className={`${classes.waftsrch} waftsrchstyle`}
                onClick={this.handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </div>
          </div>

          <Table
            tableHead={[
              'Comment Title',
              'Blog',
              'Status',
              'Added At',
              'Updated At',
              'Actions',
            ]}
            tableData={tableData}
            pagination={tablePagination}
            handlePagination={this.handlePagination}
          />
        </PageContent>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  all: makeSelectAll(),
  query: makeSelectQuery(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);

const withReducer = injectReducer({
  key: 'blogCommentManagePage',
  reducer,
});
const withSaga = injectSaga({ key: 'blogCommentManagePage', saga });

const withStyle = withStyles(styles);

export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(BlogCommentManagePage);
