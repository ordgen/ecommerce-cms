import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import { PhoneNumberUtil } from 'google-libphonenumber';
import FlatButton from 'material-ui/FlatButton';
import { FormsyText } from 'formsy-material-ui/lib';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import Header from '../../containers/Header';
import PrimaryFooter from '../footer/PrimaryFooter';
import SecondaryFooter from '../footer/SecondaryFooter';
import CartItem from '../CartItem';
import '../styles/OrderSummary.css';

/* eslint-disable react/require-default-props */

Formsy.addValidationRule('isPhoneNumber', (values, value) => {
  try {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const phoneNumber = phoneUtil.parse(value); // eslint-disable-line
    return true;
  } catch (e) {
    return false;
  }
});

const renderCartItems = (siteConfig, cartItems, handleFormDialogOpen) => {
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
                    currency={siteConfig.currency}
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
                    onTouchTap={handleFormDialogOpen}
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
                  {siteConfig.currency} {totalPrice}
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
                  {siteConfig.currency} {totalPrice}
                </p>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default function OrderSummary({
  siteConfig,
  cartItems,
  openFormDialog,
  canSubmit,
  openSuccessDialog,
  handleFormDialogClose,
  handleFormDialogOpen,
  handleFormSubmission,
  handleSuccessDialogClose,
  handleSuccessDialogCloseWithPositive,
  enableSubmitButton,
  disableSubmitButton,
}) {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={handleFormDialogClose}
    />,
    <RaisedButton
      label="Submit"
      primary={true}
      disabled={!canSubmit}
      onTouchTap={() => this.form.submit()}
      style={{ marginLeft: 10 }}
    />,
  ];

  const successDialogActions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={handleSuccessDialogClose}
    />,
    <FlatButton
      label="Continue Shopping"
      primary={true}
      onClick={handleSuccessDialogCloseWithPositive}
    />,
  ];
  const style = {
    display: 'block',
    width: '100%',
  };
  return (
    <div className="ecommerce-cms-wrapper">
      <Header />
      <div className="ecommerce-cms-main-content clearfix">
        <article className="ecommerce-cms-article">
          <article className="ecommerce-cms-article-inner">
            {siteConfig &&
              <section
                className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey"
                style={{ marginBottom: 100 }}
              >
                {renderCartItems(siteConfig, cartItems, handleFormDialogOpen)}
              </section>
            }
          </article>
        </article>
      </div>
      <PrimaryFooter />
      <SecondaryFooter />
      <Dialog
        title="Personal Details"
        actions={actions}
        modal={true}
        open={openFormDialog}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <Formsy.Form
                onValidSubmit={handleFormSubmission}
                onValid={enableSubmitButton}
                onInvalid={disableSubmitButton}
                ref={(form) => { this.form = form; }}
                noValidate
              >
                <FormsyText
                  name="firstName"
                  required
                  hintText="Enter your first name "
                  floatingLabelText="First Name"
                  style={style}
                />
                <FormsyText
                  name="lastName"
                  hintText="Enter your surname (optional)"
                  floatingLabelText="Surname"
                  style={style}
                />
                <FormsyText
                  name="phoneNumber"
                  hintText="Enter your phone number"
                  required
                  floatingLabelText="Phone Number (eg. +233244021456)"
                  style={style}
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
        onRequestClose={handleSuccessDialogClose}
      >
        <p>Your Order Has Been Successfully Processed!!! We will get back to you shortly.</p>
      </Dialog>
    </div>
  );
}

OrderSummary.propTypes = {
  siteConfig: PropTypes.object,
  cartItems: PropTypes.array,
  openFormDialog: PropTypes.bool.isRequired,
  canSubmit: PropTypes.bool.isRequired,
  openSuccessDialog: PropTypes.bool.isRequired,
  handleFormDialogClose: PropTypes.func.isRequired,
  handleFormDialogOpen: PropTypes.func.isRequired,
  handleFormSubmission: PropTypes.func.isRequired,
  handleSuccessDialogClose: PropTypes.func.isRequired,
  handleSuccessDialogCloseWithPositive: PropTypes.func.isRequired,
  enableSubmitButton: PropTypes.func.isRequired,
  disableSubmitButton: PropTypes.func.isRequired,
};
