import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../shared/Header';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';
import { trim } from '../../utils';
import { ProductCategoryProductsSelector, ProductCategorySelector } from '../../models/selectors/productCategories';

const getSiteConfig = () =>
  new Promise((resolve, reject) =>
    Meteor.call('SiteConfig.methods.getSiteConfig',
      {},
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      },
    ),
  );

const renderProductWithCategories = (siteConfig, products, productCategory) => {
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
            <img className="img-fluid" src={products[products.length - 1].pictures[0]} alt="" />
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
                  <CardMedia>
                    <img src={product.pictures[0]} alt="" />
                  </CardMedia>
                  <CardTitle title={product.name} subtitle={`${siteConfig.currency} ${product.price}`} />
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

class CategoryWithProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteConfig: null,
    };
  }

  componentDidMount() {
    getSiteConfig().then(
      (siteConfig) => {
        this.setState({
          siteConfig,
        });
      },
    );
  }

  /*componentWillReceiveProps() {
    getSiteConfig().then(
      (siteConfig) => {
        this.setState({
          siteConfig,
        });
      },
    );
  }*/

  render() {
    const { getCategory, getCategoryProducts, match } = this.props;
    const productCategory = getCategory(match.params.categoryId);
    const { siteConfig } = this.state;
    const products = getCategoryProducts(productCategory);
    return (
      <div className="ecommerce-cms-wrapper">
        <Header />
        <div className="ecommerce-cms-main-content clearfix">
          <article className="ecommerce-cms-article">
            <article className="ecommerce-cms-article-inner">
              <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
                {(siteConfig && productCategory) &&
                  <div className="container">
                    {renderProductWithCategories(siteConfig, products, productCategory)}
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
}

CategoryWithProducts.propTypes = {
  match: PropTypes.object.isRequired,
  getCategoryProducts: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  getCategoryProducts: productCategory => ProductCategoryProductsSelector(state, productCategory),
  getCategory: categoryId => ProductCategorySelector(state, categoryId),
});

export default connect(mapStateToProps, null)(CategoryWithProducts);
