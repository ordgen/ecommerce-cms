import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { CartItemsSelector } from '../../models/selectors/cartItems';
import MiniHeader from '../shared/MiniHeader';
import CartItem from '../products/CartItem';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.renderCartItems = this.renderCartItems.bind(this);
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
    const { cartItems } = this.props;
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
      </div>
    );
  }
}

OrderSummary.propTypes = {
  cartItems: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  cartItems: CartItemsSelector(state),
});

export default connect(mapStateToProps, null)(OrderSummary);
