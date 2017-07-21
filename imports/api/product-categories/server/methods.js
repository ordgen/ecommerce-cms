import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import ProductCategories from '../product-categories';

export const createProductCategory = new ValidatedMethod({
  name: 'ProductCategories.methods.createProductCategory',
  validate: new SimpleSchema({
    name: {
      type: String,
    },
    picture: {
      type: String,
      optional: true,
    },
  }).validator(),

  async run(...args) {
    return ProductCategories.insert(...args);
  },
});
