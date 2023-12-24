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
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthActionCreator } from '../authUser/action';

const fakeErrorResponse = new Error('Ups, something went wrong');

const fakeUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('asyncSetAuthUser thunk', () => {
  // backup
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  // restore
  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;

    // delete backup data
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.resolve(fakeUserResponse);

    // mock dispatch
    const dispatch = vi.fn();
    // action
    await asyncPreloadProcess()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalled(showLoading());
    expect(dispatch).toHaveBeenCalled(
      setAuthActionCreator(fakeUserResponse),
    );
    expect(dispatch).toHaveBeenCalled(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalled(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalled(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();
    // action
    await asyncPreloadProcess()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalled(showLoading());
    expect(dispatch).toHaveBeenCalled(setAuthActionCreator(null));
    expect(dispatch).toHaveBeenCalled(setIsPreloadActionCreator(null));
    expect(dispatch).toHaveBeenCalled(hideLoading());
  });
});
