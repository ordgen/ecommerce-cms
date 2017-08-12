import React, { PureComponent } from 'react';
import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';
import { white, darkBlack, lime900, lime800 } from 'material-ui/styles/colors';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from 'material-ui-search-bar';
import ActionSearch from 'material-ui/svg-icons/action/search';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MobileDrawer from './MobileDrawer';
import { ProductCategoriesSelector, ProductCategoryChildrenSelector } from '../../models/selectors/productCategories';
import './Header.css';

class MiniHeader extends PureComponent {
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
      mobile: {
        header: {
          paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
        },
        centerColumn: {
          display: 'flex',
          flexDirection: navDrawerOpen ? 'inherit' : 'column',
          justifyContent: 'center',
        },
      },
      desktop: {
        centerColumn: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      },
    };

    return (
      <div>
        {isMobile
          ? <div style={style.mobile.header}>
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
                              style={style.mobile.centerColumn}
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
                          >
                            <Link to="/">
                              <img
                                className="ecommerce-cms-header-billboard-logo"
                                src="https://s3.amazonaws.com/loystar/wallville-logo-mini.jpeg"
                                alt="logo"
                              />
                            </Link>
                          </div>
                          <div
                            className="col-md-8 col-lg-8 col-sm-8"
                          >
                            <SearchBar
                              onChange={() => console.log('onChange')}
                              onRequestSearch={() => console.log('onRequestSearch')}
                              closeIcon={<NavigationClose color={lime800} />}
                              searchIcon={<ActionSearch color={lime800} />}
                              hintText="Search Products"
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

export default connect(mapStateToProps, null)(MiniHeader);