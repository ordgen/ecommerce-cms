import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import MiniHeader from '../components/MiniHeader';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
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

const searchCategories = (searchQuery) =>
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

class MiniHeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      navDrawerOpen: false,
      siteConfig: null,
      dataSource: [],
      inputValue: '',
    };
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
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
      dataSource,
      inputValue,
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
        dataSource={dataSource}
        handleSearchRequest={this.handleSearchRequest}
        onUpdateInput={this.onUpdateInput}
        inputValue={inputValue}
      />
    );
  }
}

MiniHeaderContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MiniHeaderContainer);
