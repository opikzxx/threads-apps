/**
 * skenario testing authUserReducer function
 *    - should return the initial state when given by unknown action
 *    - should return the authUser when given by SET_AUTH_USER action
 *    - should return the authUser when given by UNSET_AUTH_USER action
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // actix  on
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });
  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });
  it('should return the authUser when given by UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: 'UNSET_AUTH_USER',
      payload: {
        authUser: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });
});
