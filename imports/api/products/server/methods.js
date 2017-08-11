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

export const editProduct = new ValidatedMethod({
  name: 'Products.methods.editProduct',
  validate: new SimpleSchema({
    productId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
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

  async run({ productId, name, productCategoryId, pictures, description, price, discount }) {
    const product = await new Promise(resolve =>
      Products.update(
        { _id: productId },
        { $set: { name, productCategoryId, pictures, description, price, discount } },
        () => resolve(Products.findOne(productId)),
      ),
    );
    return product;
  },
});


export const deleteProduct = new ValidatedMethod({
  name: 'Products.methods.deleteProduct',
  validate: new SimpleSchema({
    productId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
  }).validator(),

  async run({ productId }) {
    return Products.remove({ _id: productId });
  },
});
