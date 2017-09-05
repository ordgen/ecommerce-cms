import { createSelector } from 'redux-orm';
import orm from '../cartItemOrm';

const stateSelector = state => state.cartItems;

export const CartItemsSelector = createSelector(
  orm,
  stateSelector,
  session => session.CartItem.all().toRefArray().reverse(),
);

export const cartItemSelector = createSelector(
  orm,
  stateSelector,
  (state, productId) => productId,
  (session, productId) => session.CartItem.all().toRefArray().find(
    item => item.productId === productId,
  ),
);
