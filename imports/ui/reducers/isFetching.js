import { IS_FETCHING } from '../actions/types';

const INITIAL_STATE = { isFetching: false };

export default function isFetchingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
}
