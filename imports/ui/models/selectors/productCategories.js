import { createSelector } from 'redux-orm';
import _ from 'underscore';
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

export const ProductCategoryProductsSelector = createSelector(
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

export const ProductCategoriesWithProductSelector = createSelector(
  orm,
  stateSelector,
  session => _.compact(session.ProductCategory.all().toModelArray().map((cModel) => {
    if (cModel.products.toRefArray().length > 0) {
      return {
        ...cModel.ref,
        product: cModel.products.toRefArray()[0],
      };
    }
    return null;
  })),
);
