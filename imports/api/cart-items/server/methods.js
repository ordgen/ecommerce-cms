import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import CartItems from '../cart-items';

export const createCartItem = new ValidatedMethod({
  name: 'CartItems.methods.createCartItem',
  validate: new SimpleSchema({
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
  }).validator(),

  async run(...args) {
    const cartItem = await new Promise(resolve =>
      CartItems.insert(
        ...args,
        (err, _id) => resolve(CartItems.findOne({ _id })),
      ),
    );
    return cartItem;
  },
});

export const getAllCartItems = new ValidatedMethod({
  name: 'CartItems.methods.getAllCartItems',
  validate: null,

  async run() {
    return CartItems.find({}).fetch();
  },
});

export const editCartItem = new ValidatedMethod({
  name: 'CartItems.methods.editCartItem',
  validate: new SimpleSchema({
    cartItemId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
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
  }).validator(),

  async run({ cartItemId, quantity }) {
    const cartItem = await new Promise(resolve =>
      CartItems.update(
        { _id: cartItemId },
        { $set: { quantity } },
        () => resolve(CartItems.findOne(cartItemId)),
      ),
    );
    return cartItem;
  },
});


export const deleteCartItem = new ValidatedMethod({
  name: 'CartItems.methods.deleteCartItem',
  validate: new SimpleSchema({
    cartItemId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
  }).validator(),

  async run({ cartItemId }) {
    return CartItems.remove({ _id: cartItemId });
  },
});
