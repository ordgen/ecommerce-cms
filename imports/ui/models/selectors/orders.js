import { createSelector } from 'redux-orm';
import orm from '../orm';

const stateSelector = state => state.entities;

export const OrdersSelector = createSelector(
  orm,
  stateSelector,
  session => session.Order.all().toRefArray().map(
    order => ({
      ...order,
      product: session.Product.hasId(order.productId) ? session.Product.withId(order.productId).ref : '' }), // eslint-disable-line max-len
  ),
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
        product: session.Product.withId(order.productId),
      };
    }
    return null;
  },
);
