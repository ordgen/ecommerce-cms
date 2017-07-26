import { Meteor } from 'meteor/meteor';
import {
  CREATE_PRODUCT,
  ADD_PRODUCT_TO_CATEGORY,
  REMOVE_PRODUCT,
} from './types';

export function createProduct(data, insertIntoDb = true) {
  return dispatch => new Promise((resolve) => {
    if (insertIntoDb) {
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
            dispatch({ type: CREATE_PRODUCT, payload });
            dispatch({
              type: ADD_PRODUCT_TO_CATEGORY,
              payload: { categoryId: data.category, productId: res },
            });
            resolve({ success: res });
          } else {
            resolve({ error: err });
          }
        },
      );
    } else {
      dispatch({ type: CREATE_PRODUCT, payload: data });
      resolve();
    }
  });
}

export function removeProduct(payload) {
  return {
    type: REMOVE_PRODUCT,
    payload,
  };
}
