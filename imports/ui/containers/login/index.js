import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import selectn from 'selectn';
import Login from './ConnectLoginForm';

const styles = {
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  paper: {
    padding: 20,
    overflow: 'auto',
  },
  appBarTitle: {
    cursor: 'pointer',
  },
  textField: {
    width: '100%',
  },
};


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        emailField: '',
        passwordField: '',
      },
      errorText: '',
      errorClass: 'hidden',
    };
    this.onFieldChanged = this.onFieldChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.changePage('/dashboard/home');
    }
    if (this.props.authError) {
      this.setState({
        errorText: this.props.authError,
        errorClass: 'error-msg',
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      nextProps.changePage('/dashboard/home');
    }
    if (nextProps.authError) {
      this.setState({
        errorText: nextProps.authError,
        errorClass: 'error-msg',
      });
    }
  }

  onFieldChanged(event) {
    this.setState({ [event.target.name]: event.target.value, errorText: '', errorClass: 'hidden' });
    if (selectn('target.name', event) === 'email') {
      this.setState(prevState => ({ ...prevState, errors: { ...prevState.errors, emailField: '' } }));
    } else if (selectn('target.name', event) === 'password') {
      this.setState(prevState => ({ ...prevState, errors: { ...prevState.errors, passwordField: '' } }));
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      const emailIsValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      const passwordIsValid = password.length >= 8;
      if (!emailIsValid) {
        this.setState(prevState => ({ ...prevState, errors: { ...prevState.errors, emailField: 'Email is not valid' } }));
        return;
      }
      if (!passwordIsValid) {
        this.setState(prevState => ({ ...prevState, errors: { ...prevState.errors, passwordField: 'Password must be atleast 8 characters long' } }));
        return;
      }
      this.props.onSubmit(email, password);
    } else {
      if (!email) {
        this.setState(prevState => ({ ...prevState, errors: { ...prevState.errors, emailField: 'Please enter email' } }));
      }
      if (!password) {
        this.setState(prevState => ({ ...prevState, errors: { ...prevState.errors, passwordField: 'Please enter password' } }));
      }
    }
  }

  handleTouchTap() {
    this.props.changePage('/');
  }

  render() {
    return (
      <div>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <form>
              <div className="group">
                <TextField
                  hintText="E-mail"
                  floatingLabelText="Email"
                  onChange={this.onFieldChanged}
                  style={styles.textField}
                  name="email"
                  ref={(elem) => { this.emailField = elem; }}
                  errorText={this.state.errors.emailField}
                />
              </div>
              <div className="group">
                <TextField
                  hintText="Password"
                  type="password"
                  floatingLabelText="Password"
                  style={styles.textField}
                  onChange={this.onFieldChanged}
                  name="password"
                  ref={(elem) => { this.passwordField = elem; }}
                  errorText={this.state.errors.passwordField}
                />
              </div>
              <span role="alert" className={this.state.errorClass}>
                {this.state.errorText}
              </span>
              <RaisedButton
                label="Submit"
                primary={true}
                onClick={this.onSubmit}
                fullWidth={true}
                disabled={this.props.logInStarted}
              />
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

Form.defaultProps = {
  authError: '',
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logInStarted: PropTypes.bool.isRequired,
  authError: PropTypes.string,
};

export default Login(Form);
