import { Meteor } from 'meteor/meteor';
import {
  CREATE_PRODUCT_CATEGORY,
  REMOVE_PRODUCT_CATEGORY,
} from './types';

export function createProductCategory(data, insertIntoDb = true) {
  return dispatch => new Promise((resolve) => {
    if (insertIntoDb) {
      Meteor.call('ProductCategories.methods.createProductCategory',
        {
          name: data.name,
          parent: data.parent,
        },
        (err, res) => {
          if (!err) {
            const payload = {
              ...data,
              id: res,
            };
            dispatch({ type: CREATE_PRODUCT_CATEGORY, payload });
            resolve({ success: res });
          } else {
            resolve({ error: err });
          }
        },
      );
    } else {
      dispatch({ type: CREATE_PRODUCT_CATEGORY, payload: data });
      resolve();
    }
  });
}

export function removeProductCategory(payload) {
  return {
    type: REMOVE_PRODUCT_CATEGORY,
    payload,
  };
}
