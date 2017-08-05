import { IS_LOADING_PRODUCT_CATEGORIES } from '../actions/types';

const INITIAL_STATE = {
  isLoadingProductCategories: false,
};

export default function isLoadingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_LOADING_PRODUCT_CATEGORIES:
      return { ...state, isLoadingProductCategories: action.isLoading };
    default:
      return state;
  }
}
