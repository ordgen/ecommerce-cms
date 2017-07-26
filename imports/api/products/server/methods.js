import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Products from '../products';

export const createProduct = new ValidatedMethod({
  name: 'Products.methods.createProduct',
  validate: new SimpleSchema({
    name: {
      type: String,
    },
    productCategoryId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    pictures: {
      type: [String],
    },
    description: {
      type: String,
      optional: true,
    },
    price: {
      type: String,
      decimal: true,
    },
    discount: {
      type: String,
      optional: true,
    },
  }).validator(),

  async run(...args) {
    return Products.insert(...args);
  },
});

export const getAllProducts = new ValidatedMethod({
  name: 'Products.methods.getAllProducts',
  validate: null,

  async run() {
    return Products.find({}).fetch();
  },
});
