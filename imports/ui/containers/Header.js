import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import Header from '../components/Header';
import { selectEntities } from '../models/selectors/selectEntities';
import orm from '../models/orm';

/* eslint-disable react/require-default-props, no-console */

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

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      popOverOpen: false,
      navDrawerOpen: false,
      siteConfig: null,
      popOverAnchorElem: null,
    };
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
    this.handlePopoverlose = this.handlePopoverlose.bind(this);
    this.handleProductsMenuClick = this.handleProductsMenuClick.bind(this);
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange() {
    this.setState({ windowWidth: window.innerWidth });
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  }

  handlePopoverlose() {
    this.setState({
      popOverOpen: false,
    });
  }

  handleProductsMenuClick(event) {
    event.preventDefault();
    this.setState({
      popOverOpen: true,
      popOverAnchorElem: event.currentTarget,
    });
  }

  render() {
    const {
      siteConfig,
      windowWidth,
      navDrawerOpen,
      popOverOpen,
      popOverAnchorElem,
    } = this.state;
    const { menuItems, cartSize } = this.props;
    const isMobile = windowWidth <= 500;
    return (
      <Header
        isMobile={isMobile}
        menuItems={menuItems}
        cartSize={cartSize}
        navDrawerOpen={navDrawerOpen}
        siteConfig={siteConfig}
        popOverOpen={popOverOpen}
        handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
        popOverAnchorElem={popOverAnchorElem}
        handlePopoverlose={this.handlePopoverlose}
        handleProductsMenuClick={this.handleProductsMenuClick}
      />
    );
  }
}

HeaderContainer.propTypes = {
  cartSize: PropTypes.number,
  menuItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  const entities = selectEntities(state);
  const session = orm.session(entities);
  const { ProductCategory, CartItem } = session;
  const cartSize = CartItem.all().count();
  const getChildren = categoryId => ProductCategory.all().toRefArray().filter(c => c.parent === categoryId); // eslint-disable-line
  const extractChildren = (category) => {
    const children = getChildren(category.id);
    const productCategory = {
      ...category,
      children: children.map(child => extractChildren(child)),
    };
    return productCategory;
  };
  const allCategories = ProductCategory.all().toRefArray();
  const menuItems = allCategories.filter(c => !c.parent).map((category) => {
    const children = getChildren(category.id);
    const productCategory = {
      ...category,
      children: children.map(child => extractChildren(child)),
    };
    return productCategory;
  });
  return {
    menuItems,
    cartSize,
  };
};

export default connect(mapStateToProps, null)(HeaderContainer);
