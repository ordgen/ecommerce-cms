import { Meteor } from 'meteor/meteor';
import {
  ADD_PRODUCT,
  ADD_PRODUCT_TO_CATEGORY,
  REMOVE_PRODUCT,
  IS_LOADING_PRODUCTS,
  UPDATE_PRODUCT,
} from '../types';
import setIsLoadingState from './IsLoading';

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

export function updateProduct(payload) {
  return {
    type: UPDATE_PRODUCT,
    payload,
  };
}

export function createProduct(data) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(setIsLoadingState(IS_LOADING_PRODUCTS, true));
    Meteor.call('Products.methods.createProduct',
      data,
      (err, res) => {
        dispatch(setIsLoadingState(IS_LOADING_PRODUCTS, false));
        if (err) {
          reject(err);
        } else {
          const {
            name,
            description,
            shortDescription,
            productCategoryId,
            createdAt,
            updatedAt,
            pictures,
            price,
            discount,
          } = res;

          const payload = {
            id: res._id, // eslint-disable-line no-underscore-dangle,
            name,
            description,
            shortDescription,
            productCategoryId,
            pictures,
            price,
            discount,
            createdAt,
            updatedAt,
          };

          const payload2 = {
            categoryId: productCategoryId,
            productId: res._id, // eslint-disable-line no-underscore-dangle,
          };
          dispatch(addProduct(payload));
          dispatch(addProductToCategory(payload2));
          resolve(res);
        }
      },
    );
  });
}

export function editProduct(data) {
  return (dispatch) => {
    dispatch(setIsLoadingState(IS_LOADING_PRODUCTS, true));
    return new Promise((resolve, reject) =>
      Meteor.call('Products.methods.editProduct',
        { ...data },
        (err, res) => {
          dispatch(setIsLoadingState(IS_LOADING_PRODUCTS, false));
          if (err) {
            reject(err);
          } else {
            const {
              name,
              description,
              shortDescription,
              productCategoryId,
              createdAt,
              updatedAt,
              pictures,
              price,
              discount,
            } = res;
            const payload = {
              id: data.productId,
              name,
              description,
              shortDescription,
              productCategoryId,
              pictures,
              price,
              discount,
              createdAt,
              updatedAt,
            };
            dispatch(updateProduct(payload));
            resolve(res);
          }
        },
      ),
    );
  };
}

export function deleteProduct(id) {
  return dispatch => new Promise((resolve, reject) =>
    Meteor.call('Products.methods.deleteProduct',
      { productId: id },
      (err, res) => {
        if (!err) {
          dispatch(removeProduct({ id }));
          resolve(res);
        } else {
          reject(err);
        }
      },
    ),
  );
}
