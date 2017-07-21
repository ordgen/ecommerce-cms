/* eslint-disable no-shadow */
import { Model, attr } from 'redux-orm';
import { PropTypes } from 'prop-types';
import propTypesMixin from 'redux-orm-proptypes';
import User from './User';
import ProductCategory from './ProductCategory';
import {
  CREATE_PRODUCT,
  ADD_PRODUCT_TO_CATEGORY,
  REMOVE_PRODUCT,
} from '../actions/types';

const ValidatingModel = propTypesMixin(Model);

export default class Product extends ValidatingModel {
  toString() {
    return `Product: ${this.name}`;
  }
  static reducer(action, Product) {
    const { payload, type } = action;
    switch (type) {
      case CREATE_PRODUCT:
        Product.create(payload);
        break;
      case ADD_PRODUCT_TO_CATEGORY:
        break;
      case REMOVE_PRODUCT:
        break;
      default:
        break;
    }
  }
}

Product.modelName = 'Product';
Product.fields = {
  id: attr(), // non-relational field for any value; optional but highly recommended
  name: attr(),
  pictures: attr(),
  description: attr(),
  price: attr(),
  discount: attr(),
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  pictures: PropTypes.array.isRequired,
  user: PropTypes.oneOfType([
    PropTypes.instanceOf(User),
    PropTypes.string,
  ]).isRequired,
  productCategory: PropTypes.oneOfType([
    PropTypes.instanceOf(ProductCategory),
    PropTypes.string,
  ]).isRequired,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
  discount: PropTypes.number,
};

Product.defaultProps = {
  discount: 0,
  description: '',
};
