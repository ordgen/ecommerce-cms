import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import { Meteor } from 'meteor/meteor';
import { pinkA400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';
import { ProductSelector } from '../../models/selectors/products';
import MobileTearSheet from '../../components/MobileTearSheet';
import { addCartItem } from '../../actions/action-creators/CartItems';
import Header from '../shared/Header';
import './ProductView.css';

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

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPicture: '',
      cartBtnLabel: 'ADD TO CART',
      siteConfig: null,
      isInCart: false,
      product: null,
    };
    this.renderThumbnails = this.renderThumbnails.bind(this);
    this.handleCartBtnTap = this.handleCartBtnTap.bind(this);
  }

  componentWillMount() {
    const { getProduct, match } = this.props;
    const productId = match.params.productId;
    const product = getProduct(productId);
    console.log(product);
    if (product) {
      this.setState({
        selectedPicture: product.pictures[0],
        cartBtnLabel: product.isInCart ? 'GO TO CART' : 'ADD TO CART',
        isInCart: product.isInCart,
        product,
      });
    }
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
    const { getProduct, match } = nextProps;
    const productId = match.params.productId;
    const product = getProduct(productId);
    if (product) {
      this.setState({
        selectedPicture: product.pictures[0],
        cartBtnLabel: product.isInCart ? 'GO TO CART' : 'ADD TO CART',
        isInCart: product.isInCart,
        product,
      });
    }
  }

  handleCartBtnTap(event) {
    event.preventDefault();
    const { match, changePage, addCartItem: addItem } = this.props;
    const { isInCart, product } = this.state;
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
          changePage('/order-summary');
          this.setState({ cartBtnLabel: 'GO TO CART' });
        },
      );
    }
  }

  renderThumbnails() {
    const { getProduct, match } = this.props;
    const { selectedPicture } = this.state;
    const product = getProduct(match.params.productId);
    return product.pictures.map((picture, index) => (
      <div
        className="col-md-3 col-lg-3 col-sm-3 col-xs-6 text-xs-center"
        key={index}
      >
        <input
          type="image"
          src={picture}
          className={`img-fluid img-thumbnail m-b-1 ${selectedPicture === picture ? 'image-gallery-selected' : null}`}
          onClick={() => this.setState({ selectedPicture: picture })}
          alt=""
        />
      </div>
    ));
  }

  render() {
    const { selectedPicture, cartBtnLabel, siteConfig, product } = this.state;
    return (
      <div className="ecommerce-cms-wrapper">
        <Header />
        <div className="ecommerce-cms-main-content clearfix">
          <article className="ecommerce-cms-article">
            <article className="ecommerce-cms-article-inner">
              <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
                {(siteConfig && product) &&
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
                        style={{ marginBottom: 50 }}
                      >
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
                            {this.renderThumbnails()}
                          </div>
                        </div>
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
                            {`${siteConfig.currency} ${product.price}`}
                          </p>
                        </div>

                        <div
                          style={{ marginTop: 10, marginBottom: 25 }}
                        >
                          <RaisedButton
                            onTouchTap={this.handleCartBtnTap}
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
  }
}

ProductView.propTypes = {
  match: PropTypes.object.isRequired,
  getProduct: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  addCartItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  getProduct: productId => ProductSelector(state, productId),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addCartItem,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
