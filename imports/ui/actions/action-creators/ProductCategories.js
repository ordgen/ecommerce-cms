import { Meteor } from 'meteor/meteor';
import {
  ADD_PRODUCT_CATEGORY,
  REMOVE_PRODUCT_CATEGORY,
} from '../types';
import setIsFetchingState from './IsFetching';

export function addProductCategory(payload) {
  return {
    type: ADD_PRODUCT_CATEGORY,
    payload,
  };
}

export function removeProductCategory(payload) {
  return {
    type: REMOVE_PRODUCT_CATEGORY,
    payload,
  };
}

export function createProductCategory(data) {
  return dispatch => new Promise((resolve, reject) =>
    Meteor.call('ProductCategories.methods.createProductCategory',
      {
        name: data.name,
        description: data.description,
        parent: data.parent,
      },
      (err, res) => {
        if (!err) {
          const payload = {
            ...data,
            id: res,
          };
          dispatch(addProductCategory(payload));
          resolve(res);
        } else {
          reject(err);
        }
      },
    ),
  );
}

export function fetchAndCreateProductCategories() {
  return (dispatch) => {
    dispatch(setIsFetchingState(true));
    return Meteor.call('ProductCategories.methods.getAllProductCategories',
      (err, res) => {
        if (!err) {
          dispatch(setIsFetchingState(false));
          res.forEach((category) => {
            const payload = {
              id: category._id, // eslint-disable-line no-underscore-dangle
              name: category.name,
              description: category.description,
              parent: category.parent,
            };
            dispatch(addProductCategory(payload));
          });
        } else {
          dispatch(setIsFetchingState(false));
        }
      },
    );
  };
}
