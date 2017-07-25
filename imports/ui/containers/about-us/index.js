import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProductCategoriesSelector, ProductCategoryChildrenSelector } from '../../models/selectors/productCategorySelectors';
import Header from '../shared/Header';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';

class AboutUs extends Component {
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
                <div className="container">
                  <div className="row">
                    <div
                      className="col-md-6 col-lg-6 col-xs-12 col-sm-12"
                      style={{ marginBottom: 20 }}
                    >
                      <img className="ecommerce-cms-about-logo img-fluid" src="https://s3.amazonaws.com/loystar/wallville-logo.jpeg" alt="logo" />
                    </div>
                    <div
                      className="col-md-6 col-lg-6 visible-md visible-lg col-xs-12 col-sm-12"
                      style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
                    >
                      <p>
                        Welcome to Wallvilledecor, a contemporary interior decor company. Serving our customers unique and elegant decorative pieces sourced from all corners of the globe. We pride ourselves with giving our customers (wallvillers) a  tailor made and yet affordable designs to suit their taste.

                        Our buying teams circle the globe to bring you a wide choice of inspirational furniture, homewares and all interior accessories.

                        Our easy-to-use website allows you to shop by style or department and search by colour, material, or product. The more you shop, the more we'll get to know you and can improve your shopping experience by handpicking products we think you may also like.

                        This is evolution...This is unique styling... This is Wallvilledecor.
                      </p>
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

export default connect(mapStateToProps, null)(AboutUs);
