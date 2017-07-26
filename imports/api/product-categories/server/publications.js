import { publishComposite } from 'meteor/reywood:publish-composite';
import ProductCategories from '../product-categories';
import Products from '../../products/products';

publishComposite('productCategories', () => ({
  find() {
    return ProductCategories.find();
  },
  children: [{
    find({ _id }) {
      return ProductCategories.find({ parent: _id });
    },
    children: [{
      find({ _id }) {
        return Products.find({ productCategoryId: _id });
      },
    }],
  },
  {
    find({ _id }) {
      return Products.find({ productCategoryId: _id });
    },
  },
  ],
}));
