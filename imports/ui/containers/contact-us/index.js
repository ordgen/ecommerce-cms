import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProductCategoriesSelector, ProductCategoryChildrenSelector } from '../../models/selectors/productCategorySelectors';
import Header from '../shared/Header';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';

class ContactUs extends Component {
  static propTypes = {
    productCategories: PropTypes.array.isRequired,
    getProductCategoryChildren: PropTypes.func.isRequired,
    appState: PropTypes.object.isRequired,
  }

  getChildren(state, category) {
    const children = this.props.getProductCategoryChildren(state, category);
    const productCategory = {
      ...category,
      children: children.map(child => this.getChildren(state, child)),
    };
    return productCategory;
  }

  productCategoriesWithChildren() {
    const allCategories = this.props.productCategories;
    return allCategories.filter(c => !c.parent).map((category) => {
      const children = this.props.getProductCategoryChildren(category);
      const productCategory = {
        ...category,
        children: children.map(child => this.getChildren(this.props.appState, child)),
      };
      return productCategory;
    });
  }

  render() {
    return (
      <div className="ecommerce-cms-wrapper">
        <Header menuItems={this.productCategoriesWithChildren()} />
        <div className="ecommerce-cms-main-content clearfix">
          <article className="ecommerce-cms-article">
            <article className="ecommerce-cms-article-inner">
              <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
                <div
                  className="container"
                  style={{ minHeight: 400 }}
                >
                  <div className="row">
                    <div
                      className="col-md-6 col-lg-6 col-xs-12 col-sm-12"
                      style={{ marginBottom: 20, margin: '0 auto' }}
                    >
                      <img className="ecommerce-cms-about-logo img-fluid" src="https://s3.amazonaws.com/loystar/contact.jpg" alt="logo" />
                    </div>
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
  }
}


const mapStateToProps = state => ({
  productCategories: ProductCategoriesSelector(state),
  getProductCategoryChildren: category => ProductCategoryChildrenSelector(state, category),
  appState: state,
});

export default connect(mapStateToProps, null)(ContactUs);
