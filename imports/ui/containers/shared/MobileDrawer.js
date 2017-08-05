import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { white } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';

const MobileDrawer = (props) => {
  const { navDrawerOpen } = props;

  const styles = {
    menuItem: {
      color: white,
      fontSize: 14,
    },
  };

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}
    >
      <div>
        <List>
          <ListItem
            primaryText="Home"
            style={styles.menuItem}
            containerElement={<Link to="/" />}
          />
          <Divider />
          <ListItem
            primaryText="About Us"
            style={styles.menuItem}
            containerElement={<Link to="/about-us" />}
          />
          <Divider />
          <ListItem
            primaryText="Contact Us"
            style={styles.menuItem}
            containerElement={<Link to="/contact-us" />}
          />
          <Divider />
          <ListItem
            primaryText="Our Products"
            style={styles.menuItem}
          />
          {props.menus.map(menu => (
            <ListItem
              className="dash-menu-item"
              key={menu.id}
              style={styles.menuItem}
              primaryText={menu.name}
              containerElement={menu.children && menu.children.length > 0 ? 'span' : <Link to={`/category/${menu.id}/products`} />}
              nestedItems={(menu.children && menu.children.length > 0)
                ? menu.children.map(m => (
                  <ListItem
                    key={m.id}
                    style={styles.menuItem}
                    primaryText={m.name}
                    containerElement={<Link to={`/category/${m.id}/products`} />}
                  />
                ))
                : []
              }
            />),
          )}
          <Divider />
        </List>
      </div>
    </Drawer>
  );
};

MobileDrawer.defaultProps = {
  navDrawerOpen: true,
};

MobileDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array.isRequired,
};

export default MobileDrawer;
