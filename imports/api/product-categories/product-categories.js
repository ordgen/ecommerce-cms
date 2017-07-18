import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema } from '../../shared/schemas.js';

const ProductCategories = new Mongo.Collection('productCategories');

// Deny all client-side updates
ProductCategories.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

ProductCategories.schema = new SimpleSchema([
  BaseSchema,
  {
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    name: {
      type: String,
      label: 'Product Name',
    },
    picture: {
      type: String,
      label: 'Banner Picture',
    },
    child: {
      type: [Object],
      optional: true,
    },
    'child.$.productCategoryId': {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      optional: true,
      index: 1,
    },
  },
]);

ProductCategories.attachSchema(ProductCategories.schema);

export default ProductCategories;

