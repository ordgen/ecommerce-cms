import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { PhoneNumberUtil } from 'google-libphonenumber';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { push } from 'react-router-redux';
import { CartItemsSelector } from '../../models/selectors/cartItems';
import { createOrder } from '../../actions/action-creators/Orders';
import MiniHeader from '../shared/MiniHeader';
import CartItem from '../products/CartItem';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';
import './OrderSummary.css';

Formsy.addValidationRule('isPhoneNumber', (values, value) => {
  try {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const phoneNumber = phoneUtil.parse(value);
    console.log(phoneNumber);
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
});

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      openSuccessDialog: false,
      geoCoordinates: null,
      loadingPlace: false,
      formError: null,
      address: '',
      canSubmit: false,
      dataSource: [],
    };
    this.renderCartItems = this.renderCartItems.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleSuccessDialogClose = this.handleSuccessDialogClose.bind(this);
    this.handleSuccessDialogOpen = this.handleSuccessDialogOpen.bind(this);
    this.handleSuccessDialogCloseWithPositive = this.handleSuccessDialogCloseWithPositive.bind(this); // eslint-disable-line
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.styles = {
      formElement: {
        display: 'block',
        width: '100%',
      },
    };
  }

  onSubmit(data) {
    console.log(data);
    const { createOrder: create, cartItems } = this.props;
    create(
      {
        ...data,
        cartItemIds: cartItems.map(item => item.id),
      },
    ).then(
      () => {
        this.setState({
          openDialog: false,
          openSuccessDialog: true,
        });
      },
    ).catch(reason => this.setState({ formError: reason, openDialog: false }));
  }

  placeOrder() {
    this.form.submit();
  }

  handleDialogClose() {
    this.setState({ openDialog: false });
  }

  handleSuccessDialogClose() {
    this.setState({ openSuccessDialog: false });
  }

  handleSuccessDialogOpen() {
    this.setState({ openSuccessDialog: true });
  }

  handleSuccessDialogCloseWithPositive() {
    this.setState({ openSuccessDialog: false });
    setTimeout(() => this.props.changePage('/'), 2000);
  }

  handleDialogOpen() {
    this.setState({ openDialog: true });
  }

  enableSubmitButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableSubmitButton() {
    this.setState({
      canSubmit: false,
    });
  }

  renderCartItems(cartItems) {
    const style = {
      height: '100%',
      width: '100%',
    };

    if (cartItems.length === 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
              <h5 className="text-center">Sorry! You have not added any items to your cart!</h5>
            </div>
          </div>
        </div>
      );
    }
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += parseInt(item.price, 10) * item.quantity;
    });
    return (
      <div className="container">
        <div className="row">
          <div
            className="col-md-8 col-lg-8 col-xs-12 col-sm-12"
            style={{ marginBottom: 40 }}
          >
            <Paper
              style={style}
              zDepth={1}
            >
              <div
                style={{ height: 40, margin: '0 auto', padding: 10, textAlign: 'center' }}
              >
                <h6>MY CART</h6>
              </div>
              <Divider />
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      cartItem={item}
                    />
                  ))}
                </div>
              </div>
              <Paper
                style={{ width: '100%' }}
                zDepth={2}
              >
                <div
                  className="row"
                >
                  <div
                    className="col-md-5 col-lg-5 col-sm-5 col-xs-12"
                    style={{ padding: 20, marginLeft: '4%', marginRight: '4%' }}
                  >
                    <RaisedButton
                      containerElement={<Link to="/" />}
                      label="CONTINUE SHOPPING"
                      primary={true}
                      labelStyle={{ fontWeight: 600 }}
                      style={{ marginRight: 10, width: '100%', height: 42 }}
                    />
                  </div>
                  <div
                    className="col-md-5 col-lg-5 col-sm-5 col-xs-12"
                    style={{ padding: 20, marginLeft: '4%', marginRight: '4%' }}
                  >
                    <RaisedButton
                      label="PLACE ORDER"
                      secondary={true}
                      labelStyle={{ fontWeight: 600 }}
                      style={{ width: '100%', height: 42 }}
                      onTouchTap={this.handleDialogOpen}
                    />
                  </div>
                </div>
              </Paper>
            </Paper>
          </div>
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            <Paper
              style={{ width: '100%', height: 300 }}
              zDepth={1}
            >
              <div
                style={{ height: 40, margin: '0 auto', padding: 10, textAlign: 'center' }}
              >
                <h6>PRICE DETAILS</h6>
              </div>
              <Divider />
              <div
                style={{ margin: 15 }}
              >
                <div
                  style={{ height: 40, marginBottom: 10 }}
                >
                  <p
                    style={{ float: 'left' }}
                  >
                    {`Price (${cartItems.length} items)`}
                  </p>
                  <p
                    style={{ float: 'right' }}
                  >
                    {totalPrice}
                  </p>
                </div>
                <Divider />
                <div
                  style={{ marginTop: 10 }}
                >
                  <p
                    style={{ float: 'left', fontWeight: 600, fontSize: 18 }}
                  >
                    Amount Payable
                  </p>
                  <p
                    style={{ float: 'right' }}
                  >
                    {totalPrice}
                  </p>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { formElement } = this.styles;
    const { cartItems } = this.props;
    const { openDialog, canSubmit, openSuccessDialog, formError } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        disabled={!canSubmit}
        onTouchTap={this.placeOrder}
      />,
    ];

    const successDialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleSuccessDialogClose}
      />,
      <FlatButton
        label="Continue Shopping"
        primary={true}
        onClick={this.handleSuccessDialogCloseWithPositive}
      />,
    ];
    console.log(formError)
    return (
      <div className="ecommerce-cms-wrapper">
        <MiniHeader />
        <div className="ecommerce-cms-main-content clearfix">
          <article className="ecommerce-cms-article">
            <article className="ecommerce-cms-article-inner">
              <section
                className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey"
                style={{ marginBottom: 100 }}
              >
                {this.renderCartItems(cartItems)}
              </section>
            </article>
          </article>
        </div>
        <PrimaryFooter />
        <SecondaryFooter />
        <Dialog
          title="Personal Details"
          actions={actions}
          modal={true}
          open={openDialog}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <Formsy.Form
                  onValidSubmit={this.onSubmit}
                  onValid={this.enableSubmitButton}
                  onInvalid={this.disableSubmitButton}
                  ref={(form) => { this.form = form; }}
                  noValidate
                >
                  <FormsyText
                    name="firstName"
                    required
                    hintText="Enter your first name "
                    floatingLabelText="First Name"
                    style={formElement}
                  />
                  <FormsyText
                    name="lastName"
                    hintText="Enter your surname (optional)"
                    floatingLabelText="Surname"
                    style={formElement}
                  />
                  <FormsyText
                    name="phoneNumber"
                    hintText="Enter your phone number"
                    required
                    floatingLabelText="Phone Number (eg. +233244021456)"
                    style={formElement}
                    validations="isPhoneNumber"
                  />
                </Formsy.Form>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog
          actions={successDialogActions}
          modal={false}
          open={openSuccessDialog}
          onRequestClose={this.handleSuccessDialogClose}
        >
          <p>Your Order Has Been Successfully Processed!!! We will get back to you shortly.</p>
        </Dialog>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  cartItems: PropTypes.array.isRequired,
  createOrder: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cartItems: CartItemsSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createOrder,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
