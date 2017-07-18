import { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { setAuthState } from '../../actions/AuthActionCreators';

class Logout extends Component {
  componentWillMount() {
    Meteor.logout((err) => {
      if (!err) {
        this.props.setAuthState(false, 0);
        this.props.changePage('/login');
      }
    });
  }
  render() {
    return null;
  }
}

Logout.propTypes = {
  setAuthState: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  setAuthState,
}, dispatch);

export default connect(null, mapDispatchToProps)(Logout);
