import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './styles/ProductBox';

export default class CategoryProductBox extends Component {
  componentDidMount() {
    $(this.productContainer).hover(() => {
      setTimeout(() => {
        $(this.productContainer).css('z-index', '1000');
      }, 500);
    });
  }
  render() {
    const { category } = this.props;
    return (
      <div
        className="container-item"
        ref={(productContainer) => { this.productContainer = productContainer; }}
      >
        <div
          className="item"
          style={{
            backgroundImage: `url(${category.picture ? category.picture : ''})`,
          }}
        >
          <div className="item-overlay">
            <div className="sale-tag"><span>SALE</span></div>
          </div>
          <div className="item-content">
            <div className="item-top-content">
              <div className="item-top-content-inner">
                <div className="item-product category">
                  <div className="item-top-title">
                    <h2>{category.name}</h2>
                    <p className="subdescription">
                      {category.shortDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-add-content">
              <div className="item-add-content-inner">
                <div className="section">
                  <RaisedButton
                    className="expand"
                    containerElement={<Link to={`/category/${category.id}/products`} />}
                    label="SEE MORE"
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

CategoryProductBox.propTypes = {
  category: PropTypes.object.isRequired,
};
