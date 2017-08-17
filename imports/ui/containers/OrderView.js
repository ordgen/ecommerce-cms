import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import OrderView from '../components/pages/OrderView';

/* eslint-disable react/require-default-props, no-console */

const getOrder = orderId =>
  new Promise((resolve, reject) =>
    Meteor.call('Orders.methods.getOrder',
      { orderId },
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      },
    ),
  );

export default class OrderViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      openDialog: false,
      order: null,
    };
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogCloseWithPositive = this.handleDialogCloseWithPositive.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
  }

  componentDidMount() {
    getOrder(this.props.match.params.orderId).then(
      (order) => {
        this.setState({
          order,
        });
      },
    );
  }

  handleDialogClose() {
    this.setState({ openDialog: false });
  }

  // eslint-disable-next-line
  handleDialogCloseWithPositive() {
    console.log('CLOSE');
  }

  handleSnackRequestClose() {
    this.setState({
      openSnackBar: false,
    });
  }

  render() {
    const { openSnackBar, order, openDialog } = this.state;
    const { match } = this.props;
    return (
      <OrderView
        match={match}
        order={order}
        openSnackBar={openSnackBar}
        openDialog={openDialog}
        handleDialogClose={this.handleDialogClose}
        handleSnackRequestClose={this.handleSnackRequestClose}
        handleDialogCloseWithPositive={this.handleDialogCloseWithPositive}
      />
    );
  }
}

OrderViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
};
