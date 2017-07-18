import { Meteor } from 'meteor/meteor';
import {
  SET_AUTH,
  LOGIN_IN,
} from '../actions/types';

const loggingIn = Meteor.loggingIn();

const INITIAL_STATE = { loggedIn: !loggingIn && !!Meteor.userId(), loggingIn, error: 0 };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, loggedIn: action.newState, error: action.error };
    case LOGIN_IN:
      return { ...state, logInStarted: action.loginStarted };
    default:
      return state;
  }
}
