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
    productId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    quantity: {
      type: Number,
    },
  },
]);

Orders.attachSchema(Orders.schema);

export default Orders;

