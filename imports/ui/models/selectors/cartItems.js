import { createSelector } from 'redux-orm';
import orm from '../orm';

const stateSelector = state => state.entities;

const CartItemsSelector = createSelector(
  orm,
  stateSelector,
  session => session.CartItem.all().toRefArray(),
);

export default CartItemsSelector;
