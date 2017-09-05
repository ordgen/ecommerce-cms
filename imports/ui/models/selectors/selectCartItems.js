import { createSelector } from 'reselect';
import orm from '../cartItemOrm';

export const selectCartItems = state => state.cartItems;

export const getCartItemsSession = createSelector(
  selectCartItems,
  cartItems => orm.session(cartItems),
);
