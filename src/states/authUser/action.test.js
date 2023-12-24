/**
 * skenario testing asyncSetAuthUser thunk
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action and call alert correctly when data fetching failed
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthActionCreator } from './action';

const fakeLoginResponse = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw';

const fakeErrorResponse = new Error('Ups, something went wrong');

const user = { email: 'tanjiro11@gmail.com', password: '123123' };

describe('asyncSetAuthUser thunk', () => {
  // backup
  beforeEach(() => {
    api._login = api.login;
  });

  // restore
  afterEach(() => {
    api.login = api._login;

    // delete backup data
    delete api._login;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeLoginResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser(user)(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalled(showLoading());
    expect(dispatch).toHaveBeenCalled(
      setAuthActionCreator(fakeLoginResponse),
    );
    expect(dispatch).toHaveBeenCalled(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncSetAuthUser(user)(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
