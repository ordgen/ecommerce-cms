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
  (state, categoryId) => categoryId,
  (session, categoryId) => {
    if (session.ProductCategory.hasId(categoryId)) {
      const category = session.ProductCategory.withId(categoryId).ref;
      const products =  session.Product.all().toRefArray().filter(p => p.productCategoryId === categoryId); // eslint-disable-line
      if (category.parent && session.ProductCategory.hasId(category.parent)) {
        return {
          ...category,
          parent: session.ProductCategory.withId(category.parent).ref,
          products,
        };
      }
      return {
        ...category,
        products,
      };
    }
    return null;
  },
);

export const ProductCategoryProductsSelector = createSelector(
  orm,
  stateSelector,
  (state, categoryId) => categoryId,
  (session, categoryId) => session.Product.all().toRefArray().filter(p => p.productCategoryId === categoryId) // eslint-disable-line
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
