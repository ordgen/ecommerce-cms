import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import ProductCategories from '../product-categories';
import Products from '../../products/products';

export const createProductCategory = new ValidatedMethod({
  name: 'ProductCategories.methods.createProductCategory',
  validate: new SimpleSchema({
    name: {
      type: String,
    },
    parent: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      optional: true,
    },
    description: {
      type: String,
    },
  }).validator(),

  async run(...args) {
    const productCategory = await new Promise(resolve =>
      ProductCategories.insert(
        ...args,
        (err, _id) => resolve(ProductCategories.findOne({ _id })),
      ),
    );
    return productCategory;
  },
});

export const getAllProductCategories = new ValidatedMethod({
  name: 'ProductCategories.methods.getAllProductCategories',
  validate: null,

  async run() {
    return ProductCategories.find({}).fetch().map(
      category => ({
        ...category,
        products: Products.find({ productCategoryId: category._id }).fetch(), // eslint-disable-line
      }),
    );
  },
});

export const editCategory = new ValidatedMethod({
  name: 'ProductCategories.methods.editCategory',
  validate: new SimpleSchema({
    categoryId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    name: {
      type: String,
    },
    parent: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      optional: true,
    },
    description: {
      type: String,
    },
  }).validator(),

  async run({ categoryId, name, parent, description }) {
    const productCategory = await new Promise(resolve =>
      ProductCategories.update(
        { _id: categoryId },
        { $set: { name, parent, description } },
        () => resolve(ProductCategories.findOne(categoryId)),
      ),
    );
    return productCategory;
  },
});


export const deleteCategory = new ValidatedMethod({
  name: 'ProductCategories.methods.deleteCategory',
  validate: new SimpleSchema({
    categoryId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
  }).validator(),

  async run({ categoryId }) {
    Products.remove({ productCategoryId: categoryId });
    ProductCategories.find({ parent: categoryId }).fetch().forEach(
      (childCategory) => {
        Products.remove({ productCategoryId: childCategory._id }); // eslint-disable-line
        ProductCategories.remove({ _id: childCategory._id }); // eslint-disable-line
      },
    );
    return ProductCategories.remove({ _id: categoryId });
  },
});

export const searchCategories = new ValidatedMethod({
  name: 'ProductCategories.methods.searchCategories',
  validate: new SimpleSchema({
    searchQuery: {
      type: Object,
      blackbox: true,
    },
  }).validator(),

  async run({ searchQuery }) {
    return ProductCategories.find(searchQuery, { limit: 20 }).fetch();
  },
});
