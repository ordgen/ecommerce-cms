import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import './CartItem.css';

/* eslint-disable jsx-a11y/href-no-hash, no-console */

Formsy.addValidationRule('isIn', (values, value, array) =>
  Number.isInteger(value) && array.indexOf(value) >= 0,
);

export default class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canDecrement: false,
      canIncrement: false,
      inputValue: '',
    };
    this.deleteCartItem = this.deleteCartItem.bind(this);
    this.incrementCartItemCount = this.incrementCartItemCount.bind(this);
    this.decrementCartItemCount = this.decrementCartItemCount.bind(this);
    this.renderIncrementDecrementButtons = this.renderIncrementDecrementButtons.bind(this);
    this.enableDecrementButton = this.enableDecrementButton.bind(this);
    this.disableDecrementButton = this.disableDecrementButton.bind(this);
    this.onChange = this.onChange.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  componentWillMount() {
    const { cartItem } = this.props;
    this.setState({
      inputValue: cartItem.quantity,
    });
    if (cartItem.quantity < 5) {
      this.setState({
        canIncrement: true,
      });
    } else if (cartItem.quantity > 1) {
      this.setState({
        canDecrement: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { cartItem } = nextProps;
    this.setState({
      inputValue: cartItem.quantity,
    });
    if (cartItem.quantity < 5) {
      this.setState({
        canIncrement: true,
      });
    } else if (cartItem.quantity > 1) {
      this.setState({
        canDecrement: true,
      });
    }
  }

  deleteCartItem(e) {
    e.preventDefault();
    const cartItem = this.props.cartItem;
  }

  incrementCartItemCount() {

  }

  decrementCartItemCount() {

  }

  renderIncrementDecrementButtons() {
    return (
      <div />
    );
  }

  enableDecrementButton() {
    this.setState({
      canDecrement: true,
    });
  }

  disableDecrementButton() {
    this.setState({
      canDecrement: false,
    });
  }

  onChange(event, value) {
    if (value) {
      const val = parseInt(value, 10);
      const isValid = Number.isInteger(val) && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].indexOf(val) >= 0; // eslint-disable-line
      if (isValid) {
        this.setState({
          inputValue: val,
        });
        this.input.setState({
          value: val,
        });
        if (val < 20) {
          this.setState({
            canIncrement: true,
          });
        } else if (val > 1) {
          this.setState({
            canDecrement: true,
          });
        }
      } else {
        const curValue = this.input.getValue();
        this.setState({
          inputValue: curValue,
        });
        this.input.setState({
          value: curValue,
        });
        if (curValue < 20) {
          this.setState({
            canIncrement: true,
          });
        } else if (curValue > 1) {
          this.setState({
            canDecrement: true,
          });
        }
      }
    } else {
      this.setState({
        canDecrement: false,
        canIncrement: false,
      });
    }
  }

  increaseQuantity() {
    const curValue = this.input.getValue();
    const newValue = curValue + 1;
    this.setState({
      inputValue: newValue,
    });
    if (newValue === 20) {
      this.setState({
        canIncrement: false,
      });
    }
    if (!this.state.canDecrement) {
      this.setState({
        canDecrement: true,
      });
    }
  }

  decreaseQuantity() {
    const curValue = this.input.getValue();
    const newValue = curValue - 1;
    this.setState({
      inputValue: newValue,
    });
    if (newValue === 1) {
      this.setState({
        canDecrement: false,
      });
    }
    if (!this.state.canIncrement) {
      this.setState({
        canIncrement: true,
      });
    }
  }


  render() {
    const { cartItem } = this.props;
    const { canDecrement, canIncrement, inputValue } = this.state;
    return (
      <div>
        <div
          className="media"
          style={{ margin: 15 }}
        >
          <div
            className="media-left"
            style={{ verticalAlign: 'middle' }}
          >
            <a href="#">
              <img
                className="media-object"
                src={cartItem.image}
                alt=""
                style={{
                  maxHeight: 120,
                  borderRadius: 4,
                }}
              />
            </a>
          </div>
          <div
            className="media-body"
            style={{ padding: '0px 20px' }}
          >
            <h4 className="media-heading">{cartItem.name}</h4>
            <p
              style={{ fontWeight: 'bold', fontSize: 18 }}
            >
              {cartItem.price}
            </p>
            <div className="_3cto0P">
              <div className="_3RkJty">
                <div className="_3md1dr">
                  <button
                    disabled={canDecrement ? '' : 'disabled'}
                    className="wNrY5O"
                    onClick={this.decreaseQuantity}
                  >
                    –
                  </button>
                  <div className="_2zH4zg">
                    <Formsy.Form>
                      <FormsyText
                        name="quantity"
                        required
                        validations="isIn:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
                        underlineShow={false}
                        style={{
                          width: '100%',
                          height: 'inherit',
                        }}
                        inputStyle={{
                          margin: '0 auto',
                          display: 'block',
                          fontWeight: 500,
                          fontSize: 14,
                          textAlign: 'center',
                        }}
                        ref={(input) => { this.input = input; }}
                        onChange={this.onChange}
                        convertValue={v => parseInt(v, 10)}
                        value={inputValue}
                      />
                    </Formsy.Form>
                  </div>
                  <button
                    disabled={canIncrement ? '' : 'disabled'}
                    className="wNrY5O"
                    onClick={this.increaseQuantity}
                  > +
                  </button>
                </div>
              </div>
              <div className="_2rsOsD">
                <div className="_2xVwyr" tabIndex="13">
                  <span>Remove</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    );
  }
}

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};
