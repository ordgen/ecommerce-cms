import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { white, darkBlack } from 'material-ui/styles/colors';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import SearchBar from './SearchBar';

import './Header.css';

const style = {
  height: 100,
  width: '100%',
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
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

  render() {
    const { width } = this.state;
    const isMobile = width <= 500;

    if (isMobile) {
      return (
        <AppBar
          title="Ordgen"
          style={{ backgroundColor: white }}
          iconElementLeft={<IconButton><NavigationMenu color={darkBlack} /></IconButton>}
        />
      );
    }
    return (
      <div className="ecommerce-cms-wrapper">
        <div className="ecommerce-cms-top-section-wrapper">
          <header className="ecommerce-cms-top-section">
            <div className="ecommerce-cms-top-logo-row-wrapper-wrapper">
              <div className="ecommerce-cms-top-logo-row-wrapper">
                <div className="ecommerce-cms-top-logo-row ecommerce-cms-full-site-width">
                  <div className="ecommerce-cms-site-name-wrapper">
                    <a className="ecommerce-cms-site-name-link" href="/web/">
                      <img src="https://developers.google.com/_static/e4e8f0fba1/images/redesign-14/logo-grey.svg" className="ecommerce-cms-site-logo" alt="Web" />
                    </a>
                  </div>
                  <div className="ecommerce-cms-header-upper-tabs">
                    <nav className="ecommerce-cms-doc-set-nav ecommerce-cms-nav ecommerce-cms-overflow-tabs-scroll-wrapper">
                      <ul className="ecommerce-cms-nav-tab-list ecommerce-cms-overflow-tabs-scroll">
                        <li className="ecommerce-cms-nav-tab-container">
                          <a href="/" className="ecommerce-cms-nav-tab ecommerce-cms-nav-active">
                            Home
                          </a>
                        </li>
                        <li className="ecommerce-cms-nav-tab-container">
                          <a href="/web/tools/" className="ecommerce-cms-nav-tab">About</a>
                        </li>
                        <li className="ecommerce-cms-nav-tab-container">
                          <a href="/web/updates/" className="ecommerce-cms-nav-tab">Contact</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default Header;
