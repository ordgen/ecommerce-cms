import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema } from '../../shared/schemas.js';

const Products = new Mongo.Collection('products');

// Deny all client-side updates
Products.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Products.schema = new SimpleSchema([
  BaseSchema,
  {
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    name: {
      type: String,
      label: 'Product Name',
    },
    productCategoryId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    pictures: {
      type: [String],
      label: 'Pictures',
    },
    description: {
      type: String,
      label: 'Product Description',
    },
    price: {
      type: String,
      label: 'Price',
      decimal: true,
    },
    discount: {
      type: String,
      label: 'Discount',
      decimal: true,
      optional: true,
    },
  },
]);

Products.attachSchema(Products.schema);

export default Products;

