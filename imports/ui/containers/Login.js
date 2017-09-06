import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-material/AutoForm';
import { SubmitField, TextField } from 'uniforms-material';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { login } from '../actions/action-creators/Auth';
import { LoginFormSchema } from '../../shared/schemas';

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
      openSnackBar: false,
      snackMessage: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
    this.onValidate = this.onValidate.bind(this);
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

  onSubmit(doc) {
    this.props.login(
      doc.email,
      doc.password,
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
      });
    });
  }

  onValidate(model, error, callback) {
    if (error) {
      this.setState({
        openSnackBar: true,
        snackMessage: error.message,
      });
      return callback();
    }

    return callback(null);
  }

  handleSnackRequestClose() {
    this.setState({
      openSnackBar: false,
    });
  }

  render() {
    const { openSnackBar, snackMessage } = this.state;
    return (
      <div>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <AutoForm
              schema={LoginFormSchema}
              onSubmit={this.onSubmit}
              onValidate={this.onValidate}
              model={{}}
              showInlineError
              ref={(ref) => { this.form = ref; }}
            >
              <TextField name="email" />
              <TextField name="password" />
              <div>
                <SubmitField
                  primary
                  style={styles.submitStyle}
                />
              </div>
            </AutoForm>
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
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
