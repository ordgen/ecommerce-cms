import { Model, attr } from 'redux-orm';
import { PropTypes } from 'prop-types';

export default class CartItem extends Model {
  static get fields() {
    return {
      id: attr(),
      productId: attr(),
      name: attr(),
      price: attr(),
      quantity: attr(),
      discount: attr(),
    };
  }

  static get modelName() {
    return 'CartItem';
  }

  static propTypes = {
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    discount: PropTypes.number,
  }

  static defaultProps = {
    discount: 0,
  }

  toString() {
    return `CartItem: ${this.name}`;
  }
}
