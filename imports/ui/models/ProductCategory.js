import { Model, many, attr } from 'redux-orm';
import { PropTypes } from 'prop-types';

export default class ProductCategory extends Model {
  static get fields() {
    return {
      id: attr(),
      name: attr(),
      description: attr(),
      shortDescription: attr(),
      picture: attr(),
      createdAt: attr(),
      updatedAt: attr(),
      products: many('Product', 'productCategories'),
    };
  }
  static get modelName() {
    return 'ProductCategory';
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    picture: PropTypes.string,
    description: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    parent: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
  }

  static defaultProps = {
    picture: '',
    parent: '',
  }
  toString() {
    return `ProductCategory: ${this.name}`;
  }
}

