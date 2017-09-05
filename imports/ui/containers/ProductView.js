import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
import { pinkA400 } from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import Lightbox from 'react-image-lightbox';
import { List, ListItem } from 'material-ui/List';
import { addCartItem } from '../actions/action-creators/CartItems';
import { selectEntities } from '../models/selectors/selectEntities';
import orm from '../models/orm';
import Header from './Header';
import PrimaryFooter from '../components/footer/PrimaryFooter';
import SecondaryFooter from '../components/footer/SecondaryFooter';
import MobileTearSheet from '../components/MobileTearSheet';
import { selectCartItems } from '../models/selectors/selectCartItems';
import cartItemOrm from '../models/cartItemOrm';

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
      photoIndex: 0,
      lightboxIsOpen: false,
    };
    this.addProductToCart = this.addProductToCart.bind(this);
    this.setSelectedPicture = this.setSelectedPicture.bind(this);
    this.handleLightboxOpen = this.handleLightboxOpen.bind(this);
    this.handleLightboxNextRequest = this.handleLightboxNextRequest.bind(this);
    this.handleLightboxClose = this.handleLightboxClose.bind(this);
    this.handleLightboxPrevRequest = this.handleLightboxPrevRequest.bind(this);
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

  handleLightboxOpen() {
    this.setState({ lightboxIsOpen: true });
  }

  handleLightboxNextRequest() {
    const { product: { pictures } } = this.props;
    const { photoIndex: oldIndex } = this.state;
    const photoIndex = ((oldIndex + pictures.length) + 1) % pictures.length;
    this.setState({ photoIndex });
  }

  handleLightboxClose() {
    this.setState({ lightboxIsOpen: false });
  }

  handleLightboxPrevRequest() {
    const { product: { pictures } } = this.props;
    const { photoIndex: oldIndex } = this.state;
    const photoIndex = ((oldIndex + pictures.length) + 1) % pictures.length;
    this.setState({ photoIndex });
  }

  renderLightbox() {
    const { product } = this.props;
    const { photoIndex } = this.state;
    const images = product.pictures;
    return (
      <Lightbox
        mainSrc={images[photoIndex]}
        nextSrc={images[(photoIndex + 1) % images.length]}
        prevSrc={images[((photoIndex + images.length) - 1) % images.length]}
        onCloseRequest={this.handleLightboxClose}
        onMovePrevRequest={this.handleLightboxPrevRequest}
        onMoveNextRequest={this.handleLightboxNextRequest}
      />
    );
  }

  renderProductView() {
    const { selectedPicture, siteConfig, lightboxIsOpen } = this.state;
    const { product } = this.props;
    const currency = siteConfig ? siteConfig.currency : '';
    const cartBtnLabel = (product && product.isInCart) ? 'GO TO CART' : 'ADD TO CART';
    return (
      <div>
        {(product && lightboxIsOpen) &&
          <div>
            {this.renderLightbox()}
          </div>
        }
        <div className="ecommerce-cms-wrapper">
          <Header />
          <div className="ecommerce-cms-main-content clearfix">
            <article className="ecommerce-cms-article">
              <article className="ecommerce-cms-article-inner">
                <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
                  <div className="container">
                    <div className="row">
                      {product &&
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
                      }
                    </div>
                    <div className="row">
                      <div
                        className="col-md-8 col-lg-8 col-xs-12 col-sm-8"
                        style={{ marginBottom: 50 }}
                      >
                        {(product && selectedPicture) &&
                          <div>
                            <div className="text-xs-center m-b-1">
                              <input
                                type="image"
                                src={selectedPicture}
                                className="image-gallery-main img-fluid m-x-auto d-block image-gallery-effect"
                                onClick={() => this.handleLightboxOpen()}
                                alt=""
                              />
                            </div>
                            <div className="row">
                              {product.pictures.map((picture, index) => (
                                <div
                                  className="col-md-3 col-lg-3 col-sm-3 col-xs-6 text-xs-center"
                                  key={index}
                                >
                                  <input
                                    type="image"
                                    src={picture}
                                    className={`img-fluid img-thumbnail m-b-1 ${selectedPicture === picture ? 'image-gallery-selected' : null}`}
                                    onClick={() => this.setSelectedPicture(picture)}
                                    alt=""
                                    style={{ maxHeight: 100 }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        }
                      </div>
                      {(product && currency) &&
                        <div
                          className="col-md-4 col-lg-4 col-xs-12 col-sm-4"
                          style={{ marginBottom: 20 }}
                        >
                          <h6>{product.name}</h6>
                          <div
                            className="product-price"
                            style={{ marginBottom: 20 }}
                          >
                            <p
                              style={{ color: pinkA400, fontWeight: 'bold' }}
                            >
                              {`${currency} ${product.price}`}
                            </p>
                          </div>

                          <div
                            style={{ marginTop: 10, marginBottom: 25 }}
                          >
                            <RaisedButton
                              onTouchTap={this.addProductToCart}
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
      </div>
    );
  }

  render() {
    return this.renderProductView();
  }
}

ProductViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  addCartItem: PropTypes.func.isRequired,
  product: PropTypes.object, // eslint-disable-line
};

const mapStateToProps = (state, routeParams) => {
  const cartItemEntities = selectCartItems(state);
  const cartItemsSession = cartItemOrm.session(cartItemEntities);
  const { CartItem } = cartItemsSession;
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
      isInCart: !!CartItem.all().toRefArray().find(item => item.productId === productId),
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
