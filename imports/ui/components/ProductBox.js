import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './styles/ProductBox';
import { resize } from '../utils';

export default class ProductBox extends Component {
  componentDidMount() {
    $(this.productContainer).hover(() => {
      setTimeout(() => {
        $(this.productContainer).css('z-index', '1000');
      }, 500);
    });
  }
  render() {
    const { product, currency } = this.props;
    return (
      <div
        className="container-item"
        ref={(productContainer) => { this.productContainer = productContainer; }}
      >
        <div
          className="item"
          style={{
            backgroundImage: `url(${resize(product.pictures[0], '300x300')})`,
          }}
        >
          <div className="item-overlay">
            <div className="sale-tag"><span>SALE</span></div>
          </div>
          <div className="item-content">
            <div className="item-top-content">
              <div className="item-top-content-inner">
                <div className="item-product">
                  <div className="item-top-title">
                    <h2>{product.name}</h2>
                    <p className="subdescription">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="item-product-price">
                  <span className="price-num">{currency}{product.price}</span>
                  {/* <p className="subdescription">$36</p>
                    <div className="old-price" /> */}
                </div>
              </div>
            </div>
            <div className="item-add-content">
              <div className="item-add-content-inner">
                <div className="section">
                  <RaisedButton
                    className="expand"
                    containerElement={<Link to={`/product/${product.id}`} />}
                    label="BUY NOW"
                    primary={true}
                    labelStyle={{ fontWeight: 600 }}
                    style={{ marginRight: 10, width: '100%', height: 42 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductBox.propTypes = {
  product: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
};
