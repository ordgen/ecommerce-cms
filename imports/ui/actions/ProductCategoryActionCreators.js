import { Meteor } from 'meteor/meteor';
import {
  CREATE_PRODUCT_CATEGORY,
  REMOVE_PRODUCT_CATEGORY,
} from './types';

export function createProductCategory(data) {
  return dispatch => new Promise((resolve) => {
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
  });
}

export function removeProductCategory(payload) {
  return {
    type: REMOVE_PRODUCT_CATEGORY,
    payload,
  };
}
