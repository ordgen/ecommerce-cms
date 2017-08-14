import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM,
} from '../types';

export function addCartItem(payload) {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: ADD_CART_ITEM,
      payload,
    });
    resolve('done');
  });
}

export function removeCartItem(payload) {
  return {
    type: REMOVE_CART_ITEM,
    payload,
  };
}

export function updateCartItem(payload) {
  return {
    type: UPDATE_CART_ITEM,
    payload,
  };
}
