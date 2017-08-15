import { createSelector } from 'redux-orm';
import orm from '../orm';

const stateSelector = state => state.entities;

export const OrdersSelector = createSelector(
  orm,
  stateSelector,
  session => session.Order.all().toRefArray().map(
    order => ({
      ...order,
      cartItems: session.CartItem.all.toRefArray.filter(cartItem => order.cartItemIds.includes(cartItem.id)), // eslint-disable-line max-len
    })),
);

export const OrderSelector = createSelector(
  orm,
  stateSelector,
  (state, orderId) => orderId,
  (session, orderId) => {
    if (session.Order.hasId(orderId)) {
      const order = session.Order.withId(orderId).ref;
      return {
        ...order,
        cartItems: session.CartItem.all.toRefArray.filter(cartItem => order.cartItemIds.includes(cartItem.id)), // eslint-disable-line max-len,
      };
    }
    return null;
  },
);
