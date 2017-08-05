import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import ProductCategories from '../product-categories';
import Products from '../../products/products';

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
    description: {
      type: String,
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
    return ProductCategories.find({}).fetch().map(
      category => ({
        ...category,
        products: Products.find({ productCategoryId: category._id }).fetch(), // eslint-disable-line
      }),
    );
  },
});
