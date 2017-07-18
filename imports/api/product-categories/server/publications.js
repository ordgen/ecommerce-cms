import { Meteor } from 'meteor/meteor';
import ProductCategories from '../product-categories';

// eslint-disable-next-line prefer-arrow-callback
Meteor.publish('productCategories', function () {
  return ProductCategories.find();
});
