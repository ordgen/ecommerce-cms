import { Model, attr } from 'redux-orm';
import { PropTypes } from 'prop-types';

export default class Order extends Model {
  static get fields() {
    return {
      id: attr(),
      productId: attr(),
      quantity: attr(),
      createdAt: attr(),
      updatedAt: attr(),
    };
  }

  static get modelName() {
    return 'Order';
  }

  static propTypes = {
    productId: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
  }

  toString() {
    return `Order: ${this.name}`;
  }
}
