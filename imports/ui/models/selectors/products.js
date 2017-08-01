import { createSelector } from 'redux-orm';
import orm from '../orm';

const stateSelector = state => state.entities;

export const ProductsSelector = createSelector(
  orm,
  stateSelector,
  session => session.Product.all().toRefArray().map(
    product => ({
      ...product,
      category: session.ProductCategory.hasId(product.category) ? session.ProductCategory.withId(product.category).ref.name : '' }), // eslint-disable-line max-len
  ),
);

export const ProductSelector = createSelector(
  orm,
  stateSelector,
  (state, productId) => productId,
  (session, productId) => {
    if (session.Product.hasId(productId)) {
      const product = session.Product.withId(productId).ref;
      return {
        ...product,
        category: session.ProductCategory.withId(product.category),
      };
    }
    return null;
  },
);
