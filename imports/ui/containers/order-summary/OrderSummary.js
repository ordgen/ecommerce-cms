import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { CartItemsSelector } from '../../models/selectors/cartItems';
import { removeCartItem } from '../../actions/action-creators/CartItems';
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
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
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
                <div className="col-md-8 col-lg-8 col-sm-12 col-xs-12">
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      cartItem={item}
                    />
                  ))}
                </div>
                <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">

                </div>
              </div>
              <Paper
                style={{ width: '100%', height: 80 }}
                zDepth={2}
              />
            </Paper>
          </div>
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            <Paper
              style={style}
              zDepth={1}
            >
              <div
                style={{ height: 40, margin: '0 auto', padding: 10, textAlign: 'center' }}
              >
                <h6>PRICE DETAILS</h6>
              </div>
              <Divider />
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
                style={{ padding: 'inherit' }}
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
  removeCartItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cartItems: CartItemsSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  removeCartItem: payload => removeCartItem(payload),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
