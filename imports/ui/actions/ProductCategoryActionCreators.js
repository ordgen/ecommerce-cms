import {
  CREATE_PRODUCT_CATEGORY,
  REMOVE_PRODUCT_CATEGORY,
} from './types';

export function createProductCategory(payload) {
  return {
    type: CREATE_PRODUCT_CATEGORY,
    payload,
  };
}

export function removeProductCategory(payload) {
  return {
    type: REMOVE_PRODUCT_CATEGORY,
    payload,
  };
}
