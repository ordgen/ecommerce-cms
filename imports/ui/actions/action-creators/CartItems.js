import { Meteor } from 'meteor/meteor';
import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM,
} from '../types';

export function addCartItem(data) {
  return dispatch => new Promise((resolve, reject) => {
    Meteor.call('CartItems.methods.createCartItem',
      data,
      (err, res) => {
        if (!err) {
          const payload = {
            ...data,
            id: res._id, // eslint-disable-line no-underscore-dangle,
          };
          dispatch({
            type: ADD_CART_ITEM,
            payload,
          });
          resolve(res);
        } else {
          reject(err);
        }
      },
    );
  });
}

export function updateCartItem(data) {
  return dispatch => new Promise((resolve, reject) =>
    Meteor.call('CartItems.methods.editCartItem',
      { ...data },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const {
            quantity,
          } = res;
          const payload = {
            id: data.cartItemId,
            quantity,
          };
          dispatch({
            type: UPDATE_CART_ITEM,
            payload,
          });
          resolve(res);
        }
      },
    ),
  );
}

export function removeCartItem(id) {
  return dispatch => new Promise((resolve, reject) =>
    Meteor.call('CartItems.methods.deleteCartItem',
      { cartItemId: id },
      (err, res) => {
        if (!err) {
          dispatch({
            type: REMOVE_CART_ITEM,
            payload: { id },
          });
          resolve(res);
        } else {
          reject(err);
        }
      },
    ),
  );
}
