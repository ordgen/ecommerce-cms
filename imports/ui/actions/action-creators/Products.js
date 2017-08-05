import { Meteor } from 'meteor/meteor';
import {
  ADD_PRODUCT,
  ADD_PRODUCT_TO_CATEGORY,
  REMOVE_PRODUCT,
} from '../types';
import setIsFetchingState from './IsFetching';

export function addProduct(payload) {
  return {
    type: ADD_PRODUCT,
    payload,
  };
}


export function addProductToCategory(payload) {
  return {
    type: ADD_PRODUCT_TO_CATEGORY,
    payload,
  };
}

export function removeProduct(payload) {
  return {
    type: REMOVE_PRODUCT,
    payload,
  };
}

export function createProduct(data) {
  return dispatch => new Promise((resolve, reject) => {
    Meteor.call('Products.methods.createProduct',
      {
        name: data.name,
        productCategoryId: data.category,
        pictures: data.pictures,
        description: data.description,
        price: data.price,
      },
      (err, res) => {
        if (!err) {
          const payload = {
            ...data,
            id: res,
          };
          const payload2 = {
            categoryId: data.category,
            productId: res,
          };
          dispatch(addProduct(payload));
          dispatch(addProductToCategory(payload2));
          resolve(res);
        } else {
          reject(err);
        }
      },
    );
  });
}

