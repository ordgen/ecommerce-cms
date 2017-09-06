import { Mongo } from 'meteor/mongo';
import schema from './schema';

const Products = new Mongo.Collection('products');

// Deny all client-side updates
Products.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Products.attachSchema(schema);

export default Products;
