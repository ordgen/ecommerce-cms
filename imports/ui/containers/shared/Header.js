import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';
import { white, darkBlack, lime700 } from 'material-ui/styles/colors';
import { Link } from 'react-router-dom';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
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

class Header extends Component {
  static propTypes = {
    menuItems: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      open: false,
    };
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
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

  render() {
    const { width } = this.state;
    const isMobile = width <= 500;
    return (
      <div className="ecommerce-cms-top-section-wrapper">
        <header className="ecommerce-cms-top-section nocontent">
          <div className="ecommerce-cms-collapsible-section">
            <div className="ecommerce-cms-header-background ecommerce-cms-full-site-width">
              <div className="ecommerce-cms-collapsible-section-wrapper">
                <div className="ecommerce-cms-header-billboard">
                  <div className="container">
                    <div className="row">
                      <div
                        className="col-md-2 col-lg-2"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <img className="ecommerce-cms-header-billboard-logo" src="https://s3.amazonaws.com/loystar/wallville-logo.jpeg" alt="logo" />
                      </div>
                      <div
                        className="col-md-8 col-lg-8"
                        style={styles.centerColumn}
                      >
                        <SearchBar
                          onChange={() => console.log('onChange')}
                          onRequestSearch={() => console.log('onRequestSearch')}
                          closeIcon={<NavigationClose color={lime700} />}
                          searchIcon={<ActionSearch color={lime700} />}
                        />
                      </div>
                      <div
                        className="col-md-2 col-lg-2"
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
          {isMobile
            ? <AppBar
              title="Ordgen"
              style={{ backgroundColor: white }}
              iconElementLeft={<IconButton><NavigationMenu color={darkBlack} /></IconButton>}
            />
            : <nav className="ecommerce-cms-nav ecommerce-cms-overflow-tabs-scroll-wrapper">
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
                      {this.props.menuItems.map(menu => (
                        <MenuItem
                          key={menu.id}
                          primaryText={menu.name}
                          containerElement={menu.link ? <Link to={menu.link} /> : 'span'}
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
                                containerElement={menu2.link ? <Link to={menu2.link} /> : 'span'}
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
          }
        </header>
      </div>
    );
  }
}

export default Header;
