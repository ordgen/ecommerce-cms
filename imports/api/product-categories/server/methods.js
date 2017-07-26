import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import ProductCategories from '../product-categories';

export const createProductCategory = new ValidatedMethod({
  name: 'ProductCategories.methods.createProductCategory',
  validate: new SimpleSchema({
    name: {
      type: String,
    },
    parent: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      optional: true,
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

export const getAllProductCategories = new ValidatedMethod({
  name: 'ProductCategories.methods.getAllProductCategories',
  validate: null,

  async run() {
    return ProductCategories.find({}).fetch();
  },
});
