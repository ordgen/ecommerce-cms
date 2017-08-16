import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login } from '../../actions/action-creators/Auth';

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
  submitStyle: {
    marginTop: 32,
    display: 'block',
  },
  formElement: {
    display: 'block',
    width: '100%',
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      formError: null,
      openSnackBar: false,
      snackMessage: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
  }

  componentWillMount() {
    const { loggedIn, changePage } = this.props;
    if (loggedIn) {
      changePage('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loggedIn, changePage } = nextProps;
    if (loggedIn) {
      changePage('/dashboard');
    }
  }

  onSubmit(data) {
    this.props.login(
      data.email,
      data.password,
    ).then(
      () => {
        this.setState({
          openSnackBar: true,
          snackMessage: 'Successfully Logged In',
        });
        setTimeout(() => this.props.changePage('/dashboard'), 3000);
      },
    ).catch((error) => {
      this.setState({
        openSnackBar: true,
        snackMessage: error.message,
        formError: error.message,
      });
    });
  }

  disableSubmitButton() {
    this.setState({
      canSubmit: false,
    });
  }

  enableSubmitButton() {
    this.setState({
      canSubmit: true,
    });
  }

  handleSnackRequestClose() {
    this.setState({
      openSnackBar: false,
    });
  }

  render() {
    const { canSubmit, openSnackBar, snackMessage } = this.state;
    const { loggingIn } = this.props;
    return (
      <div>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <Formsy.Form
              onValidSubmit={this.onSubmit}
              onValid={this.enableSubmitButton}
              onInvalid={this.disableSubmitButton}
            >
              <FormsyText
                name="email"
                validations="isEmail"
                required
                hintText="Email"
                validationError="This is not an email"
                floatingLabelText="Email"
                style={styles.formElement}
              />
              <FormsyText
                name="password"
                type="password"
                required
                hintText="Password"
                floatingLabelText="Password"
                style={styles.formElement}
              />
              <RaisedButton
                style={styles.submitStyle}
                type="submit"
                label="Submit"
                primary={true}
                disabled={!canSubmit || loggingIn}
              />
            </Formsy.Form>
          </Paper>
        </div>
        <Snackbar
          open={openSnackBar}
          message={snackMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackRequestClose}
        />
      </div>
    );
  }
}


Login.propTypes = {
  login: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggingIn: state.auth.loggingIn,
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
