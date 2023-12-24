/* eslint-disable no-console */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import VoteType from '../../utils/constant';

export const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALVOTE_THREAD: 'NEUTRALVOTE_THREAD',
};

export function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

export function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
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

export function asyncReceiveThreadsActionCreator() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      console.error('Error adding thread:', error);
    } finally {
      dispatch(hideLoading());
    }
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
      console.error('Error voting thread:', error);
    } finally {
      dispatch(hideLoading());
    }
  };
}
