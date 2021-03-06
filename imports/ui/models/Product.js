import { Model, attr } from 'redux-orm';
import { PropTypes } from 'prop-types';

export default class Product extends Model {
  static get fields() {
    return {
      id: attr(),
      name: attr(),
      pictures: attr(),
      description: attr(),
      shortDescription: attr(),
      price: attr(),
      discount: attr(),
      productCategoryId: attr(),
      createdAt: attr(),
      updatedAt: attr(),
    };
  }

  static get modelName() {
    return 'Product';
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    pictures: PropTypes.array.isRequired,
    productCategoryId: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
  }

  static defaultProps = {
    discount: 0,
    description: '',
  }

  toString() {
    return `Product: ${this.name}`;
  }
}
