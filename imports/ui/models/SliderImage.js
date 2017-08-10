import { Model, attr } from 'redux-orm';
import { PropTypes } from 'prop-types';

export default class SliderImage extends Model {
  static get fields() {
    return {
      id: attr(),
      url: attr(),
      pageLink: attr(),
    };
  }

  static get modelName() {
    return 'SliderImage';
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    pageLink: PropTypes.string,
  }

  static defaultProps = {
    link: '',
  }

  toString() {
    return `SliderImage: ${this.name}`;
  }
}
