import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { ProductCategoriesSelector, ProductCategoryChildrenSelector } from '../../models/selectors';
import Header from './Header';
import { Products } from '../../site-config';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';
import './Home.css';

class Home extends Component {
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
                    {Products.map(product => (
                      <div
                        className="col-md-4 col-lg-4 col-xs-12 col-sm-6"
                        key={product.id}
                      >
                        <Card
                          style={{ marginBottom: 30 }}
                        >
                          <CardMedia>
                            <img src={product.image} alt="" />
                          </CardMedia>
                          <CardTitle title={product.category} subtitle={product.name} />
                          <CardText>
                            {product.description}
                          </CardText>
                          <CardActions>
                            <FlatButton label="View" />
                          </CardActions>
                        </Card>
                      </div>
                    ))
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
  }
}

const mapStateToProps = state => ({
  productCategories: ProductCategoriesSelector(state),
  getProductCategoryChildren: category => ProductCategoryChildrenSelector(state, category),
  appState: state,
});

export default connect(mapStateToProps, null)(Home);

