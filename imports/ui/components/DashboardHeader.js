import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import { white } from 'material-ui/styles/colors';

const style = {
  appBar: {
    defaults: {
      position: 'fixed',
      top: 0,
      overflow: 'hidden',
      maxHeight: 57,
    },
    title: {
      cursor: 'pointer',
    },
  },
  menuButton: {
    marginLeft: 10,
  },
  iconsRightContainer: {
    marginLeft: 20,
  },
};

export default function DashboardHeader({ styles, handleChangeRequestNavDrawer }) {
  return (
    <div>
      <AppBar
        style={{ ...styles, ...style.appBar.defaults }}
        iconElementLeft={
          <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
            <Menu color={white} />
          </IconButton>
        }
        iconElementRight={
          <div style={style.iconsRightContainer}>
            <IconMenu
              color={white}
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon color={white} />
                </IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Sign out" containerElement={<Link to="/logout" />} />
            </IconMenu>
          </div>
        }
      />
    </div>
  );
}

DashboardHeader.defaultProps = {
  styles: {},
};

DashboardHeader.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func.isRequired,
};
