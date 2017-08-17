import React from 'react';
import { white, darkBlack, lime900, lime800, pinkA400 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import RaisedButton from 'material-ui/RaisedButton';
import SearchBar from 'material-ui-search-bar';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import ActionSearch from 'material-ui/svg-icons/action/search';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import MobileDrawer from './MobileDrawer';
import './styles/Header.css';

/* eslint-disable react/require-default-props, no-console */

export default function Header({
  isMobile,
  navDrawerOpen,
  menuItems,
  cartSize,
  siteConfig,
  handleChangeRequestNavDrawer,
  popOverOpen,
  popOverAnchorElem,
  handlePopoverlose,
  handleProductsMenuClick,
}) {
  const paddingLeftDrawerOpen = 236;
  const styles = {
    cartCount: {
      borderRadius: '3px',
      backgroundColor: pinkA400,
      height: '20px',
      padding: '3px 6px',
      fontSize: 14,
      fontWeight: 500,
      display: 'inline-block',
      color: '#fff',
      lineHeight: '12px',
    },
    header: {
      paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
    },
    centerColumn: {
      display: 'flex',
      flexDirection: navDrawerOpen ? 'inherit' : 'column',
      justifyContent: 'center',
    },
  };

  const renderHeader = () => {
    if (isMobile) {
      return (
        <div style={styles.header}>
          <AppBar
            title={
              <img
                className="ecommerce-cms-site-mobilelogo"
                src={siteConfig ? siteConfig.primaryLogo : 'https://s3.amazonaws.com/loystar/wallville-logo.jpeg'}
                alt="logo"
              />
            }
            style={{ backgroundColor: white }}
            iconElementLeft={
              <IconButton
                onClick={handleChangeRequestNavDrawer}
              >
                <NavigationMenu color={darkBlack} />
              </IconButton>
            }
            iconElementRight={
              <FlatButton
                containerElement={<Link to="/order-summary" />}
                primary={true}
                labelPosition="before"
                labelStyle={{ fontWeight: 600 }}
                icon={
                  <FontIcon
                    className="material-icons"
                    color={darkBlack}
                  >
                    shopping_cart
                  </FontIcon>
                }
              >
                <span style={styles.cartCount}>{cartSize}</span>
              </FlatButton>
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
                            style={styles.centerColumn}
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
      );
    }

    return (
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
                        className="col-md-2 col-lg-2 col-sm-2"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <img
                          className="ecommerce-cms-header-billboard-logo"
                          src={siteConfig ? siteConfig.primaryLogo : 'https://s3.amazonaws.com/loystar/wallville-logo.jpeg'}
                          alt="logo"
                        />
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
                          containerElement={<Link to="/order-summary" />}
                          label="CART"
                          primary={true}
                          labelPosition="before"
                          labelStyle={{ fontWeight: 600 }}
                          icon={<FontIcon className="material-icons">shopping_cart</FontIcon>}
                        >
                          <span style={styles.cartCount}>{cartSize}</span>
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
                  onTouchTap={handleProductsMenuClick}
                  style={{ color: white }}
                />
                <Popover
                  open={popOverOpen}
                  anchorEl={popOverAnchorElem}
                  anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                  onRequestClose={handlePopoverlose}
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
    );
  };

  return (
    <div>
      {renderHeader()}
    </div>
  );
}

Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  navDrawerOpen: PropTypes.bool.isRequired,
  menuItems: PropTypes.array,
  cartSize: PropTypes.number,
  siteConfig: PropTypes.object,
  popOverOpen: PropTypes.bool.isRequired,
  popOverAnchorElem: React.PropTypes.object,
  handlePopoverlose: PropTypes.func.isRequired,
  handleChangeRequestNavDrawer: PropTypes.func.isRequired,
  handleProductsMenuClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
  cartSize: 0,
};
