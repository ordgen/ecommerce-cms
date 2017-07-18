import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Public = function Public({ loggedIn, loggingIn, component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggingIn) return <div />;
        return !loggedIn
          ? (React.createElement(component, { ...props, loggedIn, loggingIn }))
          : (<Redirect to="/dashboard/home" />);
      }}
    />
  );
};

Public.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  loggingIn: state.auth.loggingIn,
});

/* const mapStateToProps = (state) => {
  console.log(state);
  return {
    loggedIn: state.auth.loggedIn,
    loggingIn: false,
  };
};*/

export default withRouter(connect(mapStateToProps, null)(Public));
