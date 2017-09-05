import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { deleteOrder } from '../actions/action-creators/Orders';
import OrdersList from '../components/pages/OrdersList';
import { selectEntities } from '../models/selectors/selectEntities';
import orm from '../models/orm';

class OrdersListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      openDialog: false,
      selectedOrderId: null,
    };
    this.deleteOrder = this.deleteOrder.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDeleteDialogOpen = this.handleDeleteDialogOpen.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
  }

  deleteOrder() {
    this.props.deleteOrder(this.state.selectedOrderId).then(() => {
      this.setState({ openSnackBar: true, selectedOrderId: null, openDialog: false });
    });
  }

  handleDialogClose() {
    this.setState({ openDialog: false });
  }

  handleDeleteDialogOpen(selectedOrderId) {
    this.setState({ openDialog: true, selectedOrderId });
  }

  handleSnackRequestClose() {
    this.setState({ openSnackBar: false });
  }

  render() {
    const { match, changePage, orders } = this.props;
    const { openSnackBar, openDialog } = this.state;
    return (
      <OrdersList
        match={match}
        changePage={changePage}
        orders={orders}
        openSnackBar={openSnackBar}
        deleteOrder={this.deleteOrder}
        openDialog={openDialog}
        handleDialogClose={this.handleDialogClose}
        handleDeleteDialogOpen={this.handleDeleteDialogOpen}
        handleSnackRequestClose={this.handleSnackRequestClose}
      />
    );
  }
}

OrdersListContainer.propTypes = {
  match: PropTypes.object.isRequired,
  orders: PropTypes.array, // eslint-disable-line
  changePage: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const entities = selectEntities(state);
  const session = orm.session(entities);
  const { Order } = session;
  return {
    orders: Order.all().toRefArray().reverse(),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
  deleteOrder: orderId => deleteOrder(orderId),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrdersListContainer);
