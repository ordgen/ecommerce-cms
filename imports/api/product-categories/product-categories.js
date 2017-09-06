import { Mongo } from 'meteor/mongo';
import schema from './schema';

const ProductCategories = new Mongo.Collection('productCategories');

// Deny all client-side updates
ProductCategories.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

ProductCategories.attachSchema(schema);

export default ProductCategories;

