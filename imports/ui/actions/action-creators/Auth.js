import { Meteor } from 'meteor/meteor';
import {
  SET_AUTH,
  LOGIN_IN,
} from '../types';

/**
 * Sets the loggingIn state, which displays a loading indicator during requests
 * @param  {boolean} loggingIn The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function loginRequestStarted(loggingIn) {
  return { type: LOGIN_IN, loggingIn };
}

/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState) {
  return { type: SET_AUTH, newState };
}


/**
 * Logs a user in
 * @param  {string} email The email of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */

export function login(email, password) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(loginRequestStarted(true));
    Meteor.loginWithPassword(email, password, (err) => {
      dispatch(loginRequestStarted(false));
      if (err) {
        dispatch(setAuthState(false));
        reject(err);
      } else {
        dispatch(setAuthState(true));
        resolve('success');
      }
    });
  });
}
