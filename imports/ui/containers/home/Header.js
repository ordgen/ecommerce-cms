import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { white, darkBlack } from 'material-ui/styles/colors';
import { Tabs, Tab } from 'material-ui/Tabs';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import SearchBar from './SearchBar';

const style = {
  display: 'inline-block',
  margin: '0 32px 16px 0',
  width: '100%',
};

const styles = {
  title: {
    cursor: 'pointer',
  },
  label: {
    cursor: 'pointer',
    paddingRight: '10px',
  },
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
      <AppBar
        title="Ordgen"
        style={{ backgroundColor: white }}
        showMenuIconButton={false}
      >
        <Tabs
          initialSelectedIndex={0}
          tabItemContainerStyle={{ backgroundColor: white }}
        >
          <Tab
            label={<span style={styles.label}>Home</span>}
            data-route="/"
            style={{ color: darkBlack, textTransform: 'capitalize' }}
          />
          <Tab
            label={<span style={styles.label}>About</span>}
            data-route="/about-us"
            style={{ color: darkBlack, textTransform: 'capitalize' }}
          />
          <Tab
            label={<span style={styles.label}>Contact</span>}
            data-route="/contact-us"
            style={{ color: darkBlack, textTransform: 'capitalize' }}
          />
        </Tabs>
      </AppBar>
    );
  }
}

export default Header;
