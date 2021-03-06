import { Meteor } from 'meteor/meteor';
import {
  SET_AUTH,
  LOGIN_IN,
} from '../actions/types';

const user = Meteor.userId();

const INITIAL_STATE = {
  loggedIn: !!user,
  loggingIn: false,
  currentUser: user,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        loggedIn: action.newState,
        currentUser: Meteor.userId(),
      };
    case LOGIN_IN:
      return { ...state, loggingIn: action.loggingIn };
    default:
      return state;
  }
}
