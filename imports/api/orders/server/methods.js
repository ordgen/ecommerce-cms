import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import SiteConfig from '../../site-config/site-config';
import Orders from '../orders';

export const createOrder = new ValidatedMethod({
  name: 'Orders.methods.createOrder',
  validate: new SimpleSchema({
    cartItems: {
      type: [Object],
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
  }).validator(),

  async run({
    cartItems,
    firstName,
    lastName,
    phoneNumber,
    address,
    lat,
    lng,
  }) {
    const order = await new Promise(resolve =>
      Orders.insert(
        {
          firstName,
          lastName,
          phoneNumber,
          address,
          lat,
          lng,
        },
        (err, _id) => {
          if (err) {
            console.log(err);
          } else {
            resolve(Orders.findOne({ _id }));
          }
        },
      ),
    );
    Orders.update({ _id: order._id }, { $push: { cartItems: { $each: cartItems } } }); // eslint-disable-line
    return order;
  },
});

export const getAllOrders = new ValidatedMethod({
  name: 'Orders.methods.getAllOrders',
  validate: null,

  async run() {
    return Orders.find({}).fetch();
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

export const getOrder = new ValidatedMethod({
  name: 'Orders.methods.getOrder',
  validate: new SimpleSchema({
    orderId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
  }).validator(),

  async run({ orderId }) {
    const order = Orders.findOne({ _id: orderId });
    return {
      ...order,
      currency: SiteConfig.findOne().currency,
    };
  },
});
