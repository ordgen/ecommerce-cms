import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Orders from '../../orders/orders';
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
      type: Number,
      decimal: true,
    },
    discount: {
      type: Number,
      optional: true,
    },
  }).validator(),

  async run(...args) {
    const product = await new Promise(resolve =>
      Products.insert(
        ...args,
        (err, _id) => resolve(Products.findOne({ _id })),
      ),
    );
    return product;
  },
});

export const getAllProducts = new ValidatedMethod({
  name: 'Products.methods.getAllProducts',
  validate: null,

  async run() {
    return Products.find({}).fetch();
  },
});

export const getInfoBoxStats = new ValidatedMethod({
  name: 'Products.methods.getInfoBoxStats',
  validate: null,

  async run() {
    const tp = Products.find({}).count();
    const to = Orders.find({}).count();
    return {
      totalProducts: tp,
      totalOrders: to,
    };
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
      type: Number,
      decimal: true,
    },
    discount: {
      type: Number,
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
