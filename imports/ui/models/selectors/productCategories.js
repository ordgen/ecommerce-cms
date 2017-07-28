import { createSelector } from 'redux-orm';
import orm from '../orm';

const stateSelector = state => state.entities;

export const userSelector = createSelector(
  orm,
  stateSelector,
  session => session.User.all().toRefArray(),
);

export const ProductCategoriesSelector = createSelector(
  orm,
  stateSelector,
  session => session.ProductCategory.all().toRefArray(),
);

export const ProductCategorySelector = createSelector(
  orm,
  stateSelector,
  (state, productCategoryId) => productCategoryId,
  (session, productCategoryId) => {
    if (session.ProductCategory.hasId(productCategoryId)) {
      return session.ProductCategory.withId(productCategoryId).ref;
    }
    return null;
  },
);

export const ProductCategoryProductSelector = createSelector(
  orm,
  stateSelector,
  (state, productCategory) => productCategory,
  (session, productCategory) => session.Product.all().toRefArray().filter(
    p => p.category === productCategory.id,
  ),
);

export const ProductCategoryChildrenSelector = createSelector(
  orm,
  stateSelector,
  (state, productCategory) => productCategory,
  (session, productCategory) => session.ProductCategory.all().toRefArray().filter(
    c => c.parent === productCategory.id,
  ),
);
