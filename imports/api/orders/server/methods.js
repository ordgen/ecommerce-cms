import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Products from '../../products/products';
import Orders from '../orders';

export const createOrder = new ValidatedMethod({
  name: 'Orders.methods.createOrder',
  validate: new SimpleSchema({
    cartItemIds: {
      type: [String],
      regEx: SimpleSchema.RegEx.Id,
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
  }).validator(),

  async run(...args) {
    const order = await new Promise(resolve =>
      Orders.insert(
        ...args,
        (err, _id) => resolve(Orders.findOne({ _id })),
      ),
    );
    return order;
  },
});

export const getAllOrders = new ValidatedMethod({
  name: 'Orders.methods.getAllOrders',
  validate: null,

  async run() {
    return Orders.find({}).fetch().map(
      order => ({
        quantity: order.quantity,
        product: Products.findOne({ _id: order.productId }),
      }),
    );
  },
});

export const editOrder = new ValidatedMethod({
  name: 'Orders.methods.editOrder',
  validate: new SimpleSchema({
    orderId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    cartItemIds: {
      type: [String],
      regEx: SimpleSchema.RegEx.Id,
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
  }).validator(),

  async run({ orderId, quantity }) {
    const order = await new Promise(resolve =>
      Orders.update(
        { _id: orderId },
        { $set: { quantity } },
        () => resolve(Orders.findOne(orderId)),
      ),
    );
    return order;
  },
});


export const deleteOrder = new ValidatedMethod({
  name: 'Orders.methods.deleteOrder',
  validate: new SimpleSchema({
    orderId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
  }).validator(),

  async run({ orderId }) {
    return Orders.remove({ _id: orderId });
  },
});
