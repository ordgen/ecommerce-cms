import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import debounce from 'es6-promise-debounce';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
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

const searchCategories = searchQuery =>
  new Promise((resolve, reject) =>
    Meteor.call('ProductCategories.methods.searchCategories',
      { ...searchQuery },
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
      dataSource: [],
      inputValue: '',
    };
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
    this.handlePopoverlose = this.handlePopoverlose.bind(this);
    this.handleProductsMenuClick = this.handleProductsMenuClick.bind(this);
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
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

  onUpdateInput(e) {
    const inputValue = e.target.value;
    this.setState({
      inputValue,
    }, () => {
      this.performSearch();
    });
  }

  handleSearchRequest(value) {
    setTimeout(() => this.props.changePage(`/category/${value}/products`), 1000);
  }

  handleProductsMenuClick(event) {
    event.preventDefault();
    this.setState({
      popOverOpen: true,
      popOverAnchorElem: event.currentTarget,
    });
  }

  handlePopoverlose() {
    this.setState({
      popOverOpen: false,
    });
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  }

  handleWindowSizeChange() {
    this.setState({ windowWidth: window.innerWidth });
  }

  performSearch() {
    const { inputValue } = this.state;
    if (inputValue.length === 0) {
      this.setState({
        dataSource: [],
      });
      return;
    }
    const debouncedFunction = debounce(() =>
      new Promise((resolve) => {
        const searchQuery = {
          $and: [
            {
              $or: [
                {
                  name: {
                    $regex: inputValue,
                    $options: 'i',
                  },
                },
              ],
            },
          ],
        };
        searchCategories({ searchQuery }).then(
          (res) => {
            resolve(res);
          },
        );
      }),
    );
    debouncedFunction().then((categories) => {
      this.setState({
        dataSource: categories.map(c => ({ text: c.name, value: c._id })), // eslint-disable-line
      });
    });
  }

  render() {
    const {
      siteConfig,
      windowWidth,
      navDrawerOpen,
      popOverOpen,
      popOverAnchorElem,
      dataSource,
      inputValue,
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
        dataSource={dataSource}
        handleSearchRequest={this.handleSearchRequest}
        onUpdateInput={this.onUpdateInput}
        inputValue={inputValue}
      />
    );
  }
}

HeaderContainer.propTypes = {
  cartSize: PropTypes.number,
  menuItems: PropTypes.array,
  changePage: PropTypes.func.isRequired,
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

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
