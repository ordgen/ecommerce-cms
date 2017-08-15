import { Meteor } from 'meteor/meteor';
import {
  ADD_ORDER,
  REMOVE_ORDER,
  UPDATE_ORDER,
  IS_LOADING_ORDERS,
} from '../types';

import setIsLoadingState from './IsLoading';

export function addOrder(payload) {
  return {
    type: ADD_ORDER,
    payload,
  };
}


export function removeOrder(payload) {
  return {
    type: REMOVE_ORDER,
    payload,
  };
}

export function updateOrder(payload) {
  return {
    type: UPDATE_ORDER,
    payload,
  };
}

export function createOrder(data) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(setIsLoadingState(IS_LOADING_ORDERS, true));
    Meteor.call('Orders.methods.createOrder',
      data,
      (err, res) => {
        dispatch(setIsLoadingState(IS_LOADING_ORDERS, false));
        if (!err) {
          const {
            cartItemIds,
            createdAt,
            updatedAt,
            firstName,
            lastName,
            phoneNumber,
            address,
            lat,
            lng,
          } = res;
          const payload = {
            id: res._id, // eslint-disable-line
            cartItemIds,
            firstName,
            lastName,
            phoneNumber,
            address,
            lat,
            lng,
            createdAt,
            updatedAt,
          };
          dispatch(addOrder(payload));
          resolve(res);
        } else {
          reject(err);
        }
      },
    );
  });
}

export function editOrder(data) {
  return (dispatch) => {
    dispatch(setIsLoadingState(IS_LOADING_ORDERS, true));
    return new Promise((resolve, reject) =>
      Meteor.call('Orders.methods.editOrder',
        { ...data },
        (err, res) => {
          dispatch(setIsLoadingState(IS_LOADING_ORDERS, false));
          if (err) {
            reject(err);
          } else {
            const {
              cartItemIds,
              createdAt,
              updatedAt,
              firstName,
              lastName,
              phoneNumber,
              address,
              lat,
              lng,
            } = res;
            const payload = {
              id: data.orderId,
              cartItemIds,
              firstName,
              lastName,
              phoneNumber,
              address,
              lat,
              lng,
              createdAt,
              updatedAt,
            };
            dispatch(updateOrder(payload));
            resolve(res);
          }
        },
      ),
    );
  };
}

export function deleteOrder(id) {
  return dispatch => new Promise((resolve, reject) =>
    Meteor.call('Orders.methods.deleteOrder',
      { orderId: id },
      (err, res) => {
        if (!err) {
          dispatch(removeOrder({ id }));
          resolve(res);
        } else {
          reject(err);
        }
      },
    ),
  );
}
