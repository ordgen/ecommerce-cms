import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema } from '../../shared/schemas.js';

const CartItems = new Mongo.Collection('cartItems');

// Deny all client-side updates
CartItems.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

CartItems.schema = new SimpleSchema([
  BaseSchema,
  {
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    productId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    orderId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      optional: true,
    },
    quantity: {
      type: Number,
    },
    name: {
      type: String,
      optional: true,
    },
    price: {
      type: Number,
      decimal: true,
      optional: true,
    },
    discount: {
      type: Number,
      decimal: true,
      optional: true,
    },
    image: {
      type: String,
      optional: true,
    },
  },
]);

CartItems.attachSchema(CartItems.schema);

export default CartItems;

