/**
 * skenario testing asyncReceiveThreadsActionCreator thunk
 *    - should dispatch action correctly when data fetching success
 *    - should dispatch action and call alert correctly when data fetching failed
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncReceiveThreadsActionCreator,
  receiveThreadsActionCreator,
} from './action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncReceiveThreadsActionCreator thunk', () => {
  // backup
  beforeEach(() => {
    api.getAllThreads = api.getAllThreads;
  });

  // restore
  afterEach(() => {
    api.getAllThreads = api.getAllThreads;

    // delete backup data
    delete api.getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    // mock dispatch
    const dispatch = vi.fn();
    // action
    await asyncReceiveThreadsActionCreator()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalled(showLoading());

    expect(dispatch).toHaveBeenCalled(
      receiveThreadsActionCreator(fakeThreadsResponse),
    );
    expect(dispatch).toHaveBeenCalled(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncReceiveThreadsActionCreator()(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalled(showLoading());
    expect(dispatch).toHaveBeenCalled(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
