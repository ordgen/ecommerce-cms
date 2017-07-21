/* eslint-disable no-shadow */
import { Model, many, fk, attr } from 'redux-orm';
import { PropTypes } from 'prop-types';
import propTypesMixin from 'redux-orm-proptypes';
import User from './User';
import {
  CREATE_PRODUCT_CATEGORY,
  REMOVE_PRODUCT_CATEGORY,
} from '../actions/types';

const ValidatingModel = propTypesMixin(Model);

export default class ProductCategory extends ValidatingModel {
  static reducer(state, action, ProductCategory) {
    const { payload, type } = action;
    switch (type) {
      case CREATE_PRODUCT_CATEGORY:
        ProductCategory.create(payload);
        break;
      case REMOVE_PRODUCT_CATEGORY:
        break;
      default:
        break;
    }
  }
}

ProductCategory.modelName = 'ProductCategory';
ProductCategory.fields = {
  id: attr(),
  name: attr(),
  products: many('Product', 'productCategories'),
  user: fk('User', 'productCategories'),
};

ProductCategory.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  user: PropTypes.oneOfType([
    PropTypes.instanceOf(User),
    PropTypes.string,
  ]).isRequired,
};

ProductCategory.defaultProps = {
  picture: '',
};
