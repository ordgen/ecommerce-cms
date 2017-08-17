import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Header from '../../containers/Header';
import PrimaryFooter from '../footer/PrimaryFooter';
import SecondaryFooter from '../footer/SecondaryFooter';
import { trim } from '../../utils';

/* eslint-disable react/require-default-props */

const renderProductWithCategories = (currency, productCategory) => {
  const products = productCategory.products;
  if (products.length === 0) {
    return (
      <h5 className="text-center">Sorry! There are no products for this category!</h5>
    );
  }

  return (
    <div className="row">
      <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            {productCategory.parent
              ? <p
                style={{ fontSize: 11, color: '#878787', display: 'inline-block' }}
              >
                <Link
                  to={`/category/${productCategory.parent.id}/products`}
                  style={{ color: '#878787' }}
                >
                  {productCategory.parent.name}
                </Link>  / {productCategory.name}
              </p>
              : <p
                style={{ fontSize: 11, color: '#878787' }}
              >
                {productCategory.name}
              </p>
            }
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-6 col-lg-6 col-sm-12 col-xs-12"
            style={{ marginBottom: 20 }}
          >
            <div
              className="pk-bloc"
              style={{
                width: 'auto',
                height: 375,
                minWidth: 290,
                marginBottom: 10,
                textAlign: 'center',
              }}
            >
              <img
                className="rounded img-fluid"
                src={products[products.length - 1].pictures[0]}
                alt=""
                style={{
                  display: 'inline-block',
                  maxWidth: '100%',
                  maxHeight: 375,
                }}
              />
            </div>
          </div>
          <div
            className="col-md-6 col-lg-6 col-sm-12 col-xs-12"
            style={{ marginBottom: 20 }}
          >
            <h4>{productCategory.name}</h4>
            {productCategory.description}
          </div>
        </div>
        <div
          className="row"
          style={{ marginTop: 70 }}
        >
          {products.map(product => (
            <div
              className="col-md-4 col-lg-4 col-xs-12 col-sm-6 product-card"
              key={product.id}
            >
              <Link
                to={`/product/${product.id}`}
              >
                <Card
                  style={{ marginBottom: 30 }}
                >
                  <CardMedia
                    style={{
                      width: 'auto',
                      height: 250,
                      minWidth: 200,
                      marginBottom: 10,
                      textAlign: 'center',
                    }}
                  >
                    <img
                      className="img-fluid"
                      src={product.pictures[0]}
                      alt=""
                      style={{
                        display: 'inline-block',
                        maxWidth: '100%',
                        maxHeight: 225,
                      }}
                    />
                  </CardMedia>
                  <CardTitle title={product.name} subtitle={`${currency} ${product.price}`} />
                  <CardText>
                    {trim(product.description, 100)}
                  </CardText>
                </Card>
              </Link>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default function CategoryProductsView({ currency, productCategory }) {
  return (
    <div className="ecommerce-cms-wrapper">
      <Header />
      <div className="ecommerce-cms-main-content clearfix">
        <article className="ecommerce-cms-article">
          <article className="ecommerce-cms-article-inner">
            <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
              {(currency && productCategory) &&
                <div className="container">
                  {renderProductWithCategories(currency, productCategory)}
                </div>
              }
            </section>
          </article>
        </article>
      </div>
      <PrimaryFooter />
      <SecondaryFooter />
    </div>
  );
}

CategoryProductsView.propTypes = {
  currency: PropTypes.string,
  productCategory: PropTypes.object,
};
