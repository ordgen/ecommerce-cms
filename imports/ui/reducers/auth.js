import { Meteor } from 'meteor/meteor';
import {
  SET_AUTH,
  LOGIN_IN,
} from '../actions/types';


const INITIAL_STATE = {
  loggedIn: !!Meteor.userId(),
  loggingIn: false,
  error: 0,
  currentUser: Meteor.userId(),
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        loggedIn: action.newState,
        error: action.error,
        currentUser: Meteor.userId(),
      };
    case LOGIN_IN:
      return { ...state, loggingIn: action.loggingIn };
    default:
      return state;
  }
}
