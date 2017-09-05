import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrderView from '../components/pages/OrderView';
import { selectEntities } from '../models/selectors/selectEntities';
import orm from '../models/orm';
import SiteConfig from '../../api/site-config/site-config';

/* eslint-disable react/require-default-props, no-console */

class OrderViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      openDialog: false,
    };
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogCloseWithPositive = this.handleDialogCloseWithPositive.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
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
    const { openSnackBar, openDialog } = this.state;
    const { match, order } = this.props;
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

const mapStateToProps = (state, routeParams) => {
  const { match: { params: { orderId } } } = routeParams;
  const entities = selectEntities(state);
  const session = orm.session(entities);
  const { Order } = session;
  let order;
  if (Order.hasId(orderId)) {
    order = {
      ...Order.withId(orderId).ref,
      currency: SiteConfig.findOne().currency,
    };
  }
  return {
    order,
  };
};

OrderViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
  order: PropTypes.object, // eslint-disable-line
};

export default connect(mapStateToProps, null)(OrderViewContainer);
