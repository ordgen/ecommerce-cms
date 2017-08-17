import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import MiniHeader from '../components/MiniHeader';
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

class MiniHeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      navDrawerOpen: false,
      siteConfig: null,
    };
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
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

  render() {
    const {
      siteConfig,
      windowWidth,
      navDrawerOpen,
    } = this.state;
    const { menuItems, cartSize } = this.props;
    const isMobile = windowWidth <= 500;
    return (
      <MiniHeader
        isMobile={isMobile}
        menuItems={menuItems}
        cartSize={cartSize}
        navDrawerOpen={navDrawerOpen}
        siteConfig={siteConfig}
        handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
      />
    );
  }
}

MiniHeaderContainer.propTypes = {
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

export default connect(mapStateToProps, null)(MiniHeaderContainer);
