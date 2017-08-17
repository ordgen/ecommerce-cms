import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
import { addCartItem } from '../actions/action-creators/CartItems';
import ProductView from '../components/pages/ProductView';
import { selectEntities } from '../models/selectors/selectEntities';
import orm from '../models/orm';

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

class ProductViewContainer extends Component {
  constructor(props) {
    super(props);
    const { product } = props;
    this.state = {
      selectedPicture: product ? product.pictures[0] : '',
      siteConfig: null,
      product,
    };
    this.addProductToCart = this.addProductToCart.bind(this);
    this.setSelectedPicture = this.setSelectedPicture.bind(this);
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
    const { product } = nextProps;
    if (product) {
      this.setState({
        selectedPicture: product.pictures[0],
        product,
      });
    }
  }

  setSelectedPicture(picture) {
    this.setState({ selectedPicture: picture });
  }

  addProductToCart() {
    const { product, product: { isInCart } } = this.state;
    const { match, changePage, addCartItem: addItem } = this.props;
    if (isInCart) {
      changePage('/order-summary');
    } else {
      const { name, price, discount } = product;
      addItem({
        productId: match.params.productId,
        name,
        price: parseFloat(price, 10),
        discount: discount ? parseFloat(discount, 10) : 0,
        quantity: 1,
        image: product.pictures[0],
      }).then(
        () => {
          setTimeout(() => changePage('/order-summary'), 2000);
        },
      );
    }
  }

  render() {
    const { selectedPicture, siteConfig } = this.state;
    const { product } = this.props;
    return (
      <ProductView
        selectedPicture={selectedPicture}
        currency={siteConfig ? siteConfig.currency : ''}
        product={product}
        addProductToCart={this.addProductToCart}
        setSelectedPicture={this.setSelectedPicture}
      />
    );
  }
}

ProductViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  addCartItem: PropTypes.func.isRequired,
  product: PropTypes.object, // eslint-disable-line
};

const mapStateToProps = (state, routeParams) => {
  const { match: { params: { productId } } } = routeParams;
  const entities = selectEntities(state);
  const session = orm.session(entities);
  const { Product, ProductCategory } = session;
  let product;
  if (Product.hasId(productId)) {
    product = Product.withId(productId).ref;
    product = {
      ...product,
      category: ProductCategory.withId(product.productCategoryId).ref,
    };
  }
  return {
    product,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  addCartItem,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductViewContainer);
