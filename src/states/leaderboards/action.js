import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};
export function receiveLeaderboardActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

export default function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboard();
      dispatch(receiveLeaderboardActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
      throw new Error(error.message);
    }
    dispatch(hideLoading());
  };
}
