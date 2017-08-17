import React from 'react';
import { white, darkBlack, lime900, lime800, pinkA400 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import Autocomplete from 'react-autocomplete';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import MobileDrawer from './MobileDrawer';
import './styles/Header.css';

/* eslint-disable react/require-default-props, no-console */

export default function MiniHeader({
  isMobile,
  navDrawerOpen,
  menuItems,
  cartSize,
  siteConfig,
  handleChangeRequestNavDrawer,
  onUpdateInput,
  handleSearchRequest,
  dataSource,
  inputValue,
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
    item: {
      padding: '2px 6px',
      cursor: 'pointer',
    },
    highlightedItem: {
      color: 'white',
      background: lime800,
      padding: '2px 6px',
      cursor: 'pointer',
    },
    menu: {
      border: 'solid 1px #ccc',
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
                            <Autocomplete
                              getItemValue={item => item.value}
                              inputProps={{ id: 'search-autocomplete', placeholder: 'Search Products' }}
                              items={dataSource}
                              value={inputValue}
                              onChange={onUpdateInput}
                              onSelect={handleSearchRequest}
                              renderItem={(item, isHighlighted) => (
                                <div
                                  style={isHighlighted ? styles.highlightedItem : styles.item}
                                  key={item.value}
                                >{item.text}</div>
                              )}
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
                      >
                        <Link to="/">
                          <img
                            className="ecommerce-cms-header-billboard-logo"
                            src={siteConfig ? siteConfig.secondaryLogo : 'https://s3.amazonaws.com/loystar/wallville-logo.jpeg'}
                            alt="logo"
                          />
                        </Link>
                      </div>
                      <div
                        className="col-md-8 col-lg-8 col-sm-8"
                      >
                        <Autocomplete
                          getItemValue={item => item.value}
                          inputProps={{ id: 'search-autocomplete', placeholder: 'Search Products' }}
                          items={dataSource}
                          value={inputValue}
                          onChange={onUpdateInput}
                          onSelect={handleSearchRequest}
                          renderItem={(item, isHighlighted) => (
                            <div
                              style={isHighlighted ? styles.highlightedItem : styles.item}
                              key={item.value}
                            >{item.text}</div>
                          )}
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
    );
  };

  return (
    <div>
      {renderHeader()}
    </div>
  );
}

MiniHeader.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  navDrawerOpen: PropTypes.bool.isRequired,
  menuItems: PropTypes.array,
  cartSize: PropTypes.number,
  siteConfig: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func.isRequired,
  onUpdateInput: PropTypes.func.isRequired,
  handleSearchRequest: PropTypes.func.isRequired,
  dataSource: PropTypes.array.isRequired,
  inputValue: PropTypes.string.isRequired,
};

MiniHeader.defaultProps = {
  cartSize: 0,
};
