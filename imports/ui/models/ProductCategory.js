import { Model, many, fk, attr } from 'redux-orm';
import { PropTypes } from 'prop-types';
import User from './User';

export default class ProductCategory extends Model {
  static get fields() {
    return {
      id: attr(),
      name: attr(),
      description: attr(),
      products: many('Product', 'productCategories'),
      user: fk('User', 'productCategories'),
    };
  }
  static get modelName() {
    return 'ProductCategory';
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    picture: PropTypes.string,
    description: PropTypes.string.isRequired,
    parent: PropTypes.string,
    user: PropTypes.oneOfType([
      PropTypes.instanceOf(User),
      PropTypes.string,
    ]).isRequired,
  }

  static defaultProps = {
    picture: '',
    parent: '',
  }
  toString() {
    return `ProductCategory: ${this.name}`;
  }
}

