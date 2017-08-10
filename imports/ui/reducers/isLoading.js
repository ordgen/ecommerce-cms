import {
  IS_LOADING_PRODUCT_CATEGORIES,
  IS_LOADING_SLIDER_IMAGES,
  IS_LOADING_PRODUCTS,
} from '../actions/types';

const INITIAL_STATE = {
  isLoadingProductCategories: false,
  isLoadingSliderImages: false,
  isLoadingProducts: false,
};

export default function isLoadingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_LOADING_PRODUCT_CATEGORIES:
      return { ...state, isLoadingProductCategories: action.isLoading };
    case IS_LOADING_SLIDER_IMAGES:
      return { ...state, isLoadingSliderImages: action.isLoading };
    case IS_LOADING_PRODUCTS:
      return { ...state, isLoadingProducts: action.isLoading };
    default:
      return state;
  }
}
