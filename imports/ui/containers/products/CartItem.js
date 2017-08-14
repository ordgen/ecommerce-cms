import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { bindActionCreators } from 'redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { updateCartItem, removeCartItem } from '../../actions/action-creators/CartItems';
import './CartItem.css';

/* eslint-disable jsx-a11y/href-no-hash, no-console */

Formsy.addValidationRule('isIn', (values, value, array) =>
  Number.isInteger(value) && array.indexOf(value) >= 0,
);

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canDecrement: false,
      canIncrement: false,
      inputValue: '',
      openDialog: false,
    };
    this.deleteCartItem = this.deleteCartItem.bind(this);
    this.enableDecrementButton = this.enableDecrementButton.bind(this);
    this.disableDecrementButton = this.disableDecrementButton.bind(this);
    this.onChange = this.onChange.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogCloseWithPositive = this.handleDialogCloseWithPositive.bind(this);
  }

  componentWillMount() {
    const { cartItem: { quantity } } = this.props;
    this.setState({
      inputValue: quantity,
    });
    if (quantity < 20) {
      this.setState({
        canIncrement: true,
      });
    } else {
      this.setState({
        canIncrement: false,
      });
    }
    if (quantity > 1) {
      this.setState({
        canDecrement: true,
      });
    } else {
      this.setState({
        canDecrement: false,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { cartItem: { quantity } } = nextProps;
    this.setState({
      inputValue: quantity,
    });
    if (quantity < 20) {
      this.setState({
        canIncrement: true,
      });
    }
    if (quantity > 1) {
      this.setState({
        canDecrement: true,
      });
    }
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

  deleteCartItem(e) {
    e.preventDefault();
    this.setState({ openDialog: true });
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

  increaseQuantity() {
    const { cartItem, updateCartItem: updateItem } = this.props;
    const curValue = this.input.getValue();
    const newValue = curValue + 1;
    updateItem({
      id: cartItem.id,
      quantity: newValue,
    });
  }

  decreaseQuantity() {
    const { cartItem, updateCartItem: updateItem } = this.props;
    const curValue = this.input.getValue();
    const newValue = curValue - 1;
    updateItem({
      id: cartItem.id,
      quantity: newValue,
    });
  }

  handleDialogClose() {
    this.setState({ openDialog: false });
  }

  handleDialogCloseWithPositive() {
    this.setState({ openDialog: false });
    const { cartItem, removeCartItem: removeItem } = this.props;
    removeItem({
      id: cartItem.id,
    });
  }


  render() {
    const { cartItem } = this.props;
    const { canDecrement, canIncrement, inputValue, openDialog } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        onTouchTap={this.handleDialogCloseWithPositive}
      />,
    ];
    return (
      <div>
        <Card
          style={{ marginBottom: 10 }}
        >
          <CardHeader
            title={cartItem.name}
            subtitle={cartItem.price}
            avatar={
              <Avatar
                src={cartItem.image}
                size={80}
                style={{ borderRadius: 'inherit' }}
              />
            }
          />
          <CardText>
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
            </div>
          </CardText>
          <CardActions>
            <FlatButton
              label="Remove"
              onTouchTap={this.deleteCartItem}
            />
          </CardActions>
        </Card>
        <Dialog
          actions={actions}
          modal={false}
          open={openDialog}
          onRequestClose={this.handleDialogClose}
        >
          Are you sure? You won&apos;t be able to revert this!
        </Dialog>
      </div>
    );
  }
}

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
  removeCartItem: PropTypes.func.isRequired,
  updateCartItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  removeCartItem: payload => removeCartItem(payload),
  updateCartItem: payload => updateCartItem(payload),
}, dispatch);

export default connect(null, mapDispatchToProps)(CartItem);
