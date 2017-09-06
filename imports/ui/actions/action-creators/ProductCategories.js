import { Meteor } from 'meteor/meteor';
import {
  ADD_PRODUCT_CATEGORY,
  REMOVE_PRODUCT_CATEGORY,
  IS_LOADING_PRODUCT_CATEGORIES,
  UPDATE_PRODUCT_CATEGORY,
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

export function updateProductCategory(payload) {
  return {
    type: UPDATE_PRODUCT_CATEGORY,
    payload,
  };
}

export function createProductCategory(data) {
  return (dispatch) => {
    dispatch(setIsLoadingState(IS_LOADING_PRODUCT_CATEGORIES, true));
    return new Promise((resolve, reject) =>
      Meteor.call('ProductCategories.methods.createProductCategory',
        data,
        (err, res) => {
          dispatch(setIsLoadingState(IS_LOADING_PRODUCT_CATEGORIES, false));
          if (err) {
            reject(err);
          } else {
            const { name, description, createdAt, updatedAt, parent, picture, shortDescription } = res; // eslint-disable-line
            const payload = {
              id: res._id, // eslint-disable-line no-underscore-dangle
              name,
              description,
              shortDescription,
              createdAt,
              picture,
              updatedAt,
              parent,
            };
            dispatch(addProductCategory(payload));
            resolve(res);
          }
        },
      ),
    );
  };
}

export function fetchAndCreateProductCategories() {
  return (dispatch) => {
    dispatch(setIsLoadingState(IS_LOADING_PRODUCT_CATEGORIES, true));
    return new Promise((resolve, reject) =>
      Meteor.call('ProductCategories.methods.getAllProductCategories',
        (err, res) => {
          dispatch(setIsLoadingState(IS_LOADING_PRODUCT_CATEGORIES, false));
          if (err) {
            reject(err);
          } else {
            res.forEach((category) => {
              const { name, description, createdAt, updatedAt, parent, picture, shortDescription } = category; // eslint-disable-line
              const categoryPayload = {
                id: category._id, // eslint-disable-line no-underscore-dangle
                name,
                description,
                shortDescription,
                picture,
                createdAt,
                updatedAt,
                parent,
              };
              dispatch(addProductCategory(categoryPayload));
              category.products.forEach((product) => {
                const productPayload = {
                  id: product._id, // eslint-disable-line no-underscore-dangle
                  name: product.name,
                  price: product.price,
                  pictures: product.pictures,
                  productCategoryId: product.productCategoryId,
                  description: product.description,
                  createdAt: product.createdAt,
                  updatedAt: product.updatedAt,
                };
                dispatch(addProduct(productPayload));
                const addProductToCategoryPayload = {
                  categoryId: product.productCategoryId,
                  productId: product._id, // eslint-disable-line no-underscore-dangle,
                };
                dispatch(addProductToCategory(addProductToCategoryPayload));
              });
            });
            resolve(res);
          }
        },
      ),
    );
  };
}


export function editProductCategory(data) {
  return (dispatch) => {
    dispatch(setIsLoadingState(IS_LOADING_PRODUCT_CATEGORIES, true));
    return new Promise((resolve, reject) =>
      Meteor.call('ProductCategories.methods.editCategory',
        { ...data },
        (err, res) => {
          dispatch(setIsLoadingState(IS_LOADING_PRODUCT_CATEGORIES, false));
          if (err) {
            reject(err);
          } else {
            const { name, description, createdAt, updatedAt, parent, picture, shortDescription } = res; // eslint-disable-line
            const payload = {
              id: data.categoryId,
              name,
              description,
              shortDescription,
              picture,
              createdAt,
              updatedAt,
              parent,
            };
            dispatch(updateProductCategory(payload));
            resolve(res);
          }
        },
      ),
    );
  };
}

export function deleteProductCategory(id) {
  return dispatch => new Promise((resolve, reject) =>
    Meteor.call('ProductCategories.methods.deleteCategory',
      { categoryId: id },
      (err, res) => {
        if (!err) {
          dispatch(removeProductCategory({ id }));
          resolve(res);
        } else {
          reject(err);
        }
      },
    ),
  );
}
