import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import { pinkA400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';
import { ProductSelector } from '../../models/selectors/products';
import MobileTearSheet from '../../components/MobileTearSheet';
import Header from '../shared/Header';

const ProductView = function ProductView({ getProduct, match }) {
  const product = getProduct(match.params.productId);
  return (
    <div className="ecommerce-cms-wrapper">
      <Header />
      <div className="ecommerce-cms-main-content clearfix">
        <article className="ecommerce-cms-article">
          <article className="ecommerce-cms-article-inner">
            <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
              {product &&
                <div className="container">
                  <div className="row">
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
                  </div>
                  <div className="row">
                    <div
                      className="col-md-8 col-lg-8 col-xs-12 col-sm-8"
                      style={{ marginBottom: 20 }}
                    >
                      <img className="img-fluid" src={product.pictures[0]} alt="" />
                    </div>
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
                          {`$${product.price}`}
                        </p>
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
                  </div>
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
};

ProductView.propTypes = {
  match: PropTypes.object.isRequired,
  getProduct: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  getProduct: productId => ProductSelector(state, productId),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
