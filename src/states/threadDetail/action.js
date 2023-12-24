import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import VoteType from '../../utils/constant';

export const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT_THREAD_DETAIL: 'ADD_COMMENT_THREAD_DETAIL',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALVOTE_THREAD: 'NEUTRALVOTE_THREAD',
  UPVOTE_COMMENT_THREAD_DETAIL: 'UPVOTE_COMMENT_THREAD_DETAIL',
  DOWNVOTE_COMMENT_THREAD_DETAIL: 'DOWNVOTE_COMMENT_THREAD_DETAIL',
  NEUTRALVOTE_COMMENT_THREAD_DETAIL: 'NEUTRALVOTE_COMMENT_THREAD_DETAIL',
};

export function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

export function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}
export function addCommentThreadDetailActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_THREAD_DETAIL,
    payload: {
      comment,
    },
  };
}

export function voteThreadActionCreator({ threadId, type, userId }) {
  return {
    type,
    payload: {
      threadId,
      userId,
    },
  };
}

export function voteCommentActionCreator({ commentId, type, userId }) {
  return {
    type,
    payload: {
      commentId,
      userId,
    },
  };
}

export function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      dispatch(clearThreadDetailActionCreator());
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function asyncAddCommentThreadDetail({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentThreadDetailActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { authUser } = getState();
      const vote = await api.voteThread({ threadId, voteType });
      switch (voteType) {
        case VoteType.UpVote:
          dispatch(
            voteThreadActionCreator({
              threadId: vote.threadId,
              type: ActionType.UPVOTE_THREAD,
              userId: authUser.id,
            }),
          );
          break;
        case VoteType.DownVote:
          dispatch(
            voteThreadActionCreator({
              threadId: vote.threadId,
              type: ActionType.DOWNVOTE_THREAD,
              userId: authUser.id,
            }),
          );
          break;
        case VoteType.NeutralVote:
          dispatch(
            voteThreadActionCreator({
              threadId: vote.threadId,
              type: ActionType.NEUTRALVOTE_THREAD,
              userId: authUser.id,
            }),
          );
          break;
        default:
          break;
      }
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncVoteComment({ threadId, commentId, voteType }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { authUser } = getState();
      const comment = await api.voteComment({ threadId, voteType, commentId });
      switch (voteType) {
        case VoteType.UpVote:
          dispatch(
            voteCommentActionCreator({
              commentId: comment.commentId,
              type: ActionType.UPVOTE_COMMENT_THREAD_DETAIL,
              userId: authUser.id,
            }),
          );
          break;
        case VoteType.DownVote:
          dispatch(
            voteCommentActionCreator({
              commentId: comment.commentId,
              type: ActionType.DOWNVOTE_COMMENT_THREAD_DETAIL,
              userId: authUser.id,
            }),
          );
          break;
        case VoteType.NeutralVote:
          dispatch(
            voteCommentActionCreator({
              commentId: comment.commentId,
              type: ActionType.NEUTRALVOTE_COMMENT_THREAD_DETAIL,
              userId: authUser.id,
            }),
          );
          break;
        default:
          break;
      }
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
