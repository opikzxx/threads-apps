import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveLeaderboardActionCreator } from '../leaderboards/action';
import { receiveUsersActionCreator } from '../users/action';

export default function asyncPopulateLeaderboardsAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboard();
      const threads = await api.getAllThreads();
      const users = await api.getAllUsers();

      dispatch(receiveLeaderboardActionCreator(leaderboards));
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
