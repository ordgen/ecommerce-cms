import { Model, attr } from 'redux-orm';
import { PropTypes } from 'prop-types';

export default class Order extends Model {
  static get fields() {
    return {
      id: attr(),
      cartItemIds: attr(),
      firstName: attr(),
      lastName: attr(),
      phoneNumber: attr(),
      address: attr(),
      lat: attr(),
      lng: attr(),
      createdAt: attr(),
      updatedAt: attr(),
    };
  }

  static get modelName() {
    return 'Order';
  }

  static propTypes = {
    cartItemIds: PropTypes.array.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string.isRequired,
    address: PropTypes.string,
    lat: PropTypes.string,
    lng: PropTypes.string,
  }

  toString() {
    return `Order: ${this.name}`;
  }
}
