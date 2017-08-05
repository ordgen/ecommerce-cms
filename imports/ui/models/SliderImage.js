import { Model, attr } from 'redux-orm';
import { PropTypes } from 'prop-types';

export default class SliderImage extends Model {
  static get fields() {
    return {
      id: attr(),
      image: attr(),
      link: attr(),
    };
  }

  static get modelName() {
    return 'SliderImage';
  }

  static propTypes = {
    image: PropTypes.string.isRequired,
    link: PropTypes.string,
  }

  static defaultProps = {
    link: '',
  }

  toString() {
    return `SliderImage: ${this.name}`;
  }
}
