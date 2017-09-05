import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema } from '../../shared/schemas.js';

const Orders = new Mongo.Collection('orders');

// Deny all client-side updates
Orders.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Orders.schema = new SimpleSchema([
  BaseSchema,
  {
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    cartItems: {
      type: [Object],
      optional: true,
    },
    'cartItems.$.id': {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    'cartItems.$.productId': {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    'cartItems.$.name': {
      type: String,
    },
    'cartItems.$.price': {
      type: Number,
      decimal: true,
    },
    'cartItems.$.quantity': {
      type: Number,
    },
    'cartItems.$.image': {
      type: String,
    },
    'cartItems.$.discount': {
      type: Number,
      decimal: true,
      optional: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
      optional: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
      optional: true,
    },
    lat: {
      type: String,
      optional: true,
    },
    lng: {
      type: String,
      optional: true,
    },
  },
]);

Orders.attachSchema(Orders.schema);

export default Orders;

