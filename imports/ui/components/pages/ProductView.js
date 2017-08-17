import React from 'react';
import PropTypes from 'prop-types';
import { pinkA400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import Header from '../../containers/shared/Header';
import PrimaryFooter from '../footer/PrimaryFooter';
import SecondaryFooter from '../footer/SecondaryFooter';
import MobileTearSheet from '../MobileTearSheet';

/* eslint-disable react/require-default-props */

export default function ProductView({
  product,
  currency,
  selectedPicture,
  addProductToCart,
  setSelectedPicture,
}) {
  const cartBtnLabel = (product && product.isInCart) ? 'GO TO CART' : 'ADD TO CART';
  return (
    <div>
      <div className="ecommerce-cms-wrapper">
        <Header />
        <div className="ecommerce-cms-main-content clearfix">
          <article className="ecommerce-cms-article">
            <article className="ecommerce-cms-article-inner">
              <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
                <div className="container">
                  <div className="row">
                    {product &&
                      <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <p
                          style={{ fontSize: 11, color: '#878787', display: 'inline-block' }}
                        >
                          <Link
                            to={`/category/${product.category.id}/products`}
                            style={{ textDecoration: 'none', color: '#878787' }}
                          >
                            {product.category.name}
                          </Link>  / {product.name}
                        </p>
                      </div>
                    }
                  </div>
                  <div className="row">
                    <div
                      className="col-md-8 col-lg-8 col-xs-12 col-sm-8"
                      style={{ marginBottom: 50 }}
                    >
                      {(product && selectedPicture) &&
                        <div>
                          <div className="text-xs-center m-b-1">
                            <input
                              type="image"
                              src={selectedPicture}
                              className="image-gallery-main img-fluid m-x-auto d-block image-gallery-effect"
                              alt=""
                            />
                          </div>
                          <div className="row">
                            {product.pictures.map((picture, index) => (
                              <div
                                className="col-md-3 col-lg-3 col-sm-3 col-xs-6 text-xs-center"
                                key={index}
                              >
                                <input
                                  type="image"
                                  src={picture}
                                  className={`img-fluid img-thumbnail m-b-1 ${selectedPicture === picture ? 'image-gallery-selected' : null}`}
                                  onClick={() => setSelectedPicture(picture)}
                                  alt=""
                                  style={{ maxHeight: 100 }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      }
                    </div>
                    {(product && currency) &&
                      <div
                        className="col-md-4 col-lg-4 col-xs-12 col-sm-4"
                        style={{ marginBottom: 20 }}
                      >
                        <h4>{product.name}</h4>
                        <div
                          className="product-price"
                          style={{ marginBottom: 20 }}
                        >
                          <p
                            style={{ color: pinkA400, fontWeight: 'bold' }}
                          >
                            {`${currency} ${product.price}`}
                          </p>
                        </div>

                        <div
                          style={{ marginTop: 10, marginBottom: 25 }}
                        >
                          <RaisedButton
                            onTouchTap={addProductToCart}
                            label={cartBtnLabel}
                            secondary={true}
                            labelPosition="before"
                            labelStyle={{ fontWeight: 600 }}
                            icon={<FontIcon className="material-icons">shopping_cart</FontIcon>}
                            style={{ width: '100%', height: 42 }}
                          />
                        </div>

                        <MobileTearSheet>
                          <List>
                            <Subheader inset={true}>Description</Subheader>
                            <ListItem
                              primaryText={product.description}
                              hoverColor="inherit"
                              style={{ cursor: 'auto' }}
                            />
                          </List>
                        </MobileTearSheet>
                      </div>
                    }
                  </div>
                </div>
              </section>
            </article>
          </article>
        </div>
        <PrimaryFooter />
        <SecondaryFooter />
      </div>
    </div>
  );
}

ProductView.propTypes = {
  product: PropTypes.object,
  currency: PropTypes.string,
  selectedPicture: PropTypes.string,
  addProductToCart: PropTypes.func.isRequired,
  setSelectedPicture: PropTypes.func.isRequired,
};
