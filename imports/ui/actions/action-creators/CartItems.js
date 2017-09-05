import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM,
} from '../types';

export function addCartItem(data) {
  return dispatch => new Promise((resolve) => {
    const payload = {
      ...data,
      id: Random.id(),
    };
    dispatch({
      type: ADD_CART_ITEM,
      payload,
    });
    resolve('SUCCESS');
  });
}

export function fetchAndCreateCartItems() {
  return dispatch =>
    new Promise((resolve, reject) =>
      Meteor.call('CartItems.methods.getAllCartItems',
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            res.forEach((cartItem) => {
              const {
                productId,
                name,
                orderId,
                price,
                discount,
                quantity,
                image,
              } = cartItem;
              const payload = {
                id: cartItem._id, // eslint-disable-line
                productId,
                name,
                orderId,
                price,
                discount,
                quantity,
                image,
              };
              dispatch({
                type: ADD_CART_ITEM,
                payload,
              });
            });
            resolve(res);
          }
        },
      ),
    );
}

export function updateCartItem(data) {
  return dispatch => new Promise((resolve) => {
    const payload = {
      id: data.cartItemId,
      quantity: data.quantity,
    };
    dispatch({
      type: UPDATE_CART_ITEM,
      payload,
    });
    resolve('SUCCESS');
  });
}

export function removeCartItem(id) {
  return dispatch => new Promise((resolve) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: { id },
    });
    resolve('SUCCESS');
  });
}
