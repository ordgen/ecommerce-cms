import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import CategoryProductsView from '../components/pages/CategoryProductsView';
import { selectEntities } from '../models/selectors/selectEntities';
import orm from '../models/orm';

/* eslint-disable react/require-default-props */

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

class CategoryProductsViewContainer extends Component {
  constructor(props) {
    super(props);
    const { productCategory } = props;
    this.state = {
      siteConfig: null,
      productCategory,
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

  componentWillReceiveProps(nextProps) {
    const { productCategory } = nextProps;
    if (productCategory) {
      this.setState({
        productCategory,
      });
    }
  }

  render() {
    const { siteConfig } = this.state;
    const { productCategory } = this.props;
    return (
      <CategoryProductsView
        currency={siteConfig ? siteConfig.currency : ''}
        productCategory={productCategory}
      />
    );
  }
}

CategoryProductsViewContainer.propTypes = {
  productCategory: PropTypes.object,
};

const mapStateToProps = (state, routeParams) => {
  const { match: { params: { categoryId } } } = routeParams;
  const entities = selectEntities(state);
  const session = orm.session(entities);
  const { Product, ProductCategory } = session;
  let productCategory;
  if (ProductCategory.hasId(categoryId)) {
    productCategory = ProductCategory.withId(categoryId).ref;
    const products =  Product.all().toRefArray().filter(p => p.productCategoryId === categoryId); // eslint-disable-line
    productCategory = {
      ...productCategory,
      parent: ProductCategory.hasId(productCategory.parent) ? ProductCategory.withId(productCategory.parent).ref : null, // eslint-disable-line
      products,
    };
  }
  return {
    productCategory,
  };
};

export default connect(mapStateToProps, null)(CategoryProductsViewContainer);
