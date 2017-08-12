import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../shared/Header';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';
import { ProductCategoryProductsSelector, ProductCategorySelector } from '../../models/selectors/productCategories';

const CategoryWithProducts = function CategoryWithProducts({ getCategory, getCategoryProducts, match }) { // eslint-disable-line
  const productCategory = getCategory(match.params.categoryId);
  const products = getCategoryProducts(productCategory);

  return (
    <div className="ecommerce-cms-wrapper">
      <Header />
      <div className="ecommerce-cms-main-content clearfix">
        <article className="ecommerce-cms-article">
          <article className="ecommerce-cms-article-inner">
            <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
              <div className="container">
                <div className="row">
                  {(products && productCategory && products.length > 0) &&
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
                                <CardTitle title={product.name} subtitle={`$${product.price}`} />
                                <CardText>
                                  {product.description}
                                </CardText>
                              </Card>
                            </Link>
                          </div>
                        ))
                        }
                      </div>
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
  );
};

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
