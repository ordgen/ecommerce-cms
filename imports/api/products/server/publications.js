import { publishComposite } from 'meteor/reywood:publish-composite';
import Products from '../products';
import ProductCategories from '../../product-categories/product-categories';


publishComposite('products', () => ({
  find() {
    return Products.find();
  },
  children: [{
    find({ productCategoryId }) {
      return ProductCategories.find(productCategoryId);
    },
  }],
}));
