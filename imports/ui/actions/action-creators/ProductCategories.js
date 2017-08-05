import { Meteor } from 'meteor/meteor';
import {
  ADD_PRODUCT_CATEGORY,
  REMOVE_PRODUCT_CATEGORY,
  IS_LOADING_PRODUCT_CATEGORIES,
} from '../types';
import setIsLoadingState from './IsLoading';
import { addProduct, addProductToCategory } from './Products';

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
  return dispatch => new Promise((resolve, reject) => {
    dispatch(setIsLoadingState(IS_LOADING_PRODUCT_CATEGORIES, true));
    return Meteor.call('ProductCategories.methods.createProductCategory',
      {
        name: data.name,
        description: data.description,
        parent: data.parent,
      },
      (err, res) => {
        dispatch(setIsLoadingState(IS_LOADING_PRODUCT_CATEGORIES, false));
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
    );
  },
  );
}

export function fetchAndCreateProductCategories() {
  return (dispatch) => {
    dispatch(setIsLoadingState(IS_LOADING_PRODUCT_CATEGORIES, true));
    return Meteor.call('ProductCategories.methods.getAllProductCategories',
      (err, res) => {
        dispatch(setIsLoadingState(IS_LOADING_PRODUCT_CATEGORIES, false));
        if (!err) {
          res.forEach((category) => {
            const categoryPayload = {
              id: category._id, // eslint-disable-line no-underscore-dangle
              name: category.name,
              description: category.description,
              parent: category.parent,
            };
            dispatch(addProductCategory(categoryPayload));
            category.products.forEach((product) => {
              const productPayload = {
                id: product._id, // eslint-disable-line no-underscore-dangle
                name: product.name,
                price: product.price,
                pictures: product.pictures,
                category: product.productCategoryId,
                description: product.description,
              };
              dispatch(addProduct(productPayload));
              const addProductToCategoryPayload = {
                categoryId: product.productCategoryId,
                productId: product._id, // eslint-disable-line no-underscore-dangle,
              };
              dispatch(addProductToCategory(addProductToCategoryPayload));
            });
          });
        }
      },
    );
  };
}
