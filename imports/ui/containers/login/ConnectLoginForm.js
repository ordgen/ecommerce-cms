import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login } from '../../actions/AuthActionCreators';

export default function connectLoginForm(Form) {
  class ConnectLoginForm extends Component {
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(...args) {
      this.props.login(...args);
    }

    render() {
      const {
        onSubmit,
        props: { changePage, loggedIn, logInStarted, authError },
      } = this;
      return (
        <Form
          onSubmit={onSubmit}
          loggedIn={loggedIn}
          changePage={changePage}
          logInStarted={logInStarted}
          authError={authError}
        />
      );
    }
  }

  ConnectLoginForm.defaultProps = {
    authError: '',
  };

  ConnectLoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    logInStarted: PropTypes.bool.isRequired,
    authError: PropTypes.string,
  };

  const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn,
    logInStarted: state.auth.logInStarted,
    authError: state.auth.error,
  });

  const mapDispatchToProps = dispatch => bindActionCreators({
    login,
    changePage: path => push(path),
  }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(ConnectLoginForm);
}
