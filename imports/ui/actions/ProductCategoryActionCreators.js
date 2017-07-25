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
      },
      (err, res) => {
        if (!err) {
          const payload = {
            id: res,
            name: data.name,
            user: data.user,
          };
          dispatch({ type: CREATE_PRODUCT_CATEGORY, payload });
        }
        resolve(res);
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
