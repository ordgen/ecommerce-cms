import { createSelector } from 'redux-orm';
import orm from '../orm';

const stateSelector = state => state.entities;

const ProductsSelector = createSelector(
  orm,
  stateSelector,
  session => session.Product.all().toRefArray().map(
    product => ({
      ...product,
      category: session.ProductCategory.hasId(product.category) ? session.ProductCategory.withId(product.category).ref.name : '' }), // eslint-disable-line max-len
  ),
);

export { ProductsSelector };
