import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { spacing, typography } from 'material-ui/styles';
import { white, green600 } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';

const LeftDrawer = (props) => {
  const { navDrawerOpen } = props;

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: green600,
      paddingLeft: 40,
      height: 56,
    },
    menuItem: {
      color: white,
      fontSize: 14,
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        backgroundImage: `url(${require('../images/material_bg.png')})`, // eslint-disable-line global-require
        height: 80,
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)',
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444',
      },
    },
  };

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}
    >
      <div style={styles.logo}>
        OrdgenLabs
      </div>
      <div style={styles.avatar.div}>
        <Avatar
          size={50}
          style={styles.avatar.icon}
        />
        <span style={styles.avatar.span}>{props.username}</span>
      </div>
      <div>
        <List>
          {props.menus.map((menu, index) => (
            <ListItem
              className="dash-menu-item"
              key={index}
              style={styles.menuItem}
              primaryText={menu.text}
              leftIcon={menu.icon}
              containerElement={menu.link ? <Link to={menu.link} /> : 'span'}
              nestedItems={(menu.children && menu.children.length > 0)
                ? menu.children.map((m, ind) => (
                  <ListItem
                    key={ind}
                    style={styles.menuItem}
                    primaryText={m.text}
                    leftIcon={m.icon}
                    containerElement={m.link ? <Link to={m.link} /> : 'span'}
                  />
                ))
                : []
              }
            />),
          )}
        </List>
      </div>
    </Drawer>
  );
};

LeftDrawer.defaultProps = {
  navDrawerOpen: true,
  username: '',
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array.isRequired,
  username: PropTypes.string,
};

export default LeftDrawer;
