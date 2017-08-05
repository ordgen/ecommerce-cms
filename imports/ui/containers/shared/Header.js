import React, { PureComponent } from 'react';
import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';
import { white, darkBlack, lime900, lime800 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import RaisedButton from 'material-ui/RaisedButton';
import SearchBar from 'material-ui-search-bar';
import FontIcon from 'material-ui/FontIcon';
import ActionSearch from 'material-ui/svg-icons/action/search';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import MobileDrawer from './MobileDrawer';
import { ProductCategoriesSelector, ProductCategoryChildrenSelector } from '../../models/selectors/productCategories';
import './Header.css';

const styles = {
  cartCount: {
    borderRadius: '3px',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    height: '20px',
    padding: '3px 6px',
    fontWeight: 500,
    display: 'inline-block',
    color: '#fff',
    lineHeight: '12px',
  },
  centerColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

class Header extends PureComponent {
  static propTypes = {
    productCategories: PropTypes.array.isRequired,
    getProductCategoryChildren: PropTypes.func.isRequired,
    appState: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      open: false,
      navDrawerOpen: false,
    };
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  getChildren(state, category) {
    const children = this.props.getProductCategoryChildren(state, category);
    const productCategory = {
      ...category,
      children: children.map(child => this.getChildren(state, child)),
    };
    return productCategory;
  }

  handleWindowSizeChange() {
    this.setState({ width: window.innerWidth });
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
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
    const menuItems = this.productCategoriesWithChildren();
    const { width, navDrawerOpen } = this.state;
    const isMobile = width <= 500;
    const paddingLeftDrawerOpen = 236;

    const style = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
      },
      centerColumn: {
        display: 'flex',
        flexDirection: navDrawerOpen ? 'inherit' : 'column',
        justifyContent: 'center',
      },
    };

    return (
      <div>
        {isMobile
          ? <div style={style.header}>
            <AppBar
              title={<img className="ecommerce-cms-site-mobilelogo" src="https://s3.amazonaws.com/loystar/wallville-logo.jpeg" alt="logo" />}
              style={{ backgroundColor: white }}
              iconElementLeft={
                <IconButton
                  onClick={this.handleChangeRequestNavDrawer}
                >
                  <NavigationMenu color={darkBlack} />
                </IconButton>
              }
            />
            <div className="ecommerce-cms-top-section-wrapper">
              <header className="ecommerce-cms-top-section nocontent">
                <div className="ecommerce-cms-collapsible-section">
                  <div className="ecommerce-cms-header-background ecommerce-cms-full-site-width">
                    <div className="ecommerce-cms-collapsible-section-wrapper">
                      <div
                        className="ecommerce-cms-header-billboard"
                        style={{ backgroundColor: lime900 }}
                      >
                        <div className="container">
                          <div className="row">
                            <div
                              className="col-xs-12 col-sm-12"
                              style={style.centerColumn}
                            >
                              <SearchBar
                                onChange={() => console.log('onChange')}
                                onRequestSearch={() => console.log('onRequestSearch')}
                                closeIcon={<NavigationClose color={lime800} />}
                                searchIcon={<ActionSearch color={lime800} />}
                                hintText={navDrawerOpen ? '' : 'Search Products'}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
            </div>
            <MobileDrawer
              navDrawerOpen={navDrawerOpen}
              menus={menuItems}
            />
          </div>
          : <div className="ecommerce-cms-top-section-wrapper">
            <header className="ecommerce-cms-top-section nocontent">
              <div className="ecommerce-cms-collapsible-section">
                <div className="ecommerce-cms-header-background ecommerce-cms-full-site-width">
                  <div className="ecommerce-cms-collapsible-section-wrapper">
                    <div
                      className="ecommerce-cms-header-billboard"
                      style={{ backgroundColor: lime900 }}
                    >
                      <div className="container">
                        <div className="row">
                          <div
                            className="col-md-2 col-lg-2 col-sm-2"
                            style={{ display: 'flex', justifyContent: 'center' }}
                          >
                            <img className="ecommerce-cms-header-billboard-logo" src="https://s3.amazonaws.com/loystar/wallville-logo.jpeg" alt="logo" />
                          </div>
                          <div
                            className="col-md-8 col-lg-8 col-sm-8"
                            style={styles.centerColumn}
                          >
                            <SearchBar
                              onChange={() => console.log('onChange')}
                              onRequestSearch={() => console.log('onRequestSearch')}
                              closeIcon={<NavigationClose color={lime800} />}
                              searchIcon={<ActionSearch color={lime800} />}
                              hintText="Search Products"
                            />
                          </div>
                          <div
                            className="col-md-2 col-lg-2 col-sm-2"
                            style={styles.centerColumn}
                          >
                            <RaisedButton
                              containerElement={<Link to="/confirm-order" />}
                              label="CART"
                              primary={true}
                              labelPosition="before"
                              labelStyle={{ fontWeight: 600 }}
                              icon={<FontIcon className="material-icons">shopping_cart</FontIcon>}
                            >
                              <span style={styles.cartCount}>0</span>
                            </RaisedButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <nav className="ecommerce-cms-nav ecommerce-cms-overflow-tabs-scroll-wrapper">
                <ul className="ecommerce-cms-nav-tab-list ecommerce-cms-overflow-tabs-scroll">
                  <li className="ecommerce-cms-nav-tab-container">
                    <FlatButton
                      label="HOME"
                      primary={true}
                      style={{ color: white, display: 'inline' }}
                      containerElement={<Link to="/" />}
                    />
                  </li>
                  <li className="ecommerce-cms-nav-tab-container">
                    <FlatButton
                      label="ABOUT US"
                      primary={true}
                      style={{ color: white, display: 'inline' }}
                      containerElement={<Link to="/about-us" />}
                    />
                  </li>
                  <li className="ecommerce-cms-nav-tab-container">
                    <FlatButton
                      label="OUR PRODUCTS"
                      labelPosition="before"
                      primary={true}
                      icon={<NavigationExpandMore color={white} />}
                      onTouchTap={this.handleTouchTap}
                      style={{ color: white }}
                    />
                    <Popover
                      open={this.state.open}
                      anchorEl={this.state.anchorEl}
                      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                      onRequestClose={this.handleRequestClose}
                    >
                      <Menu>
                        {menuItems.map(menu => (
                          <MenuItem
                            key={menu.id}
                            primaryText={menu.name}
                            containerElement={menu.children && menu.children.length > 0 ? 'span' : <Link to={`/category/${menu.id}/products`} />}
                            rightIcon={
                              menu.children.length > 0
                                ? <ArrowDropRight />
                                : null
                            }
                            menuItems={(menu.children && menu.children.length > 0)
                              ? menu.children.map(menu2 => (
                                <MenuItem
                                  key={menu2.id}
                                  primaryText={menu2.name}
                                  containerElement={<Link to={`/category/${menu2.id}/products`} />}
                                />
                              ))
                              : []
                            }
                          />),
                        )}
                      </Menu>
                    </Popover>
                  </li>
                  <li className="ecommerce-cms-nav-tab-container">
                    <FlatButton
                      label="CONTACT US"
                      primary={true}
                      style={{ color: white, display: 'inline' }}
                      containerElement={<Link to="/contact-us" />}
                    />
                  </li>
                </ul>
              </nav>
            </header>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productCategories: ProductCategoriesSelector(state),
  getProductCategoryChildren: category => ProductCategoryChildrenSelector(state, category),
  appState: state,
});

export default connect(mapStateToProps, null)(Header);
