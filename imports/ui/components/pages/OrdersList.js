import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import BreadCrumbs from '../BreadCrumbs';
import Spinner from '../Spinner';

/* eslint-disable react/require-default-props */

const renderOrders = (orders, changePage, handleDeleteDialogOpen) => {
  if (orders.length === 0) {
    return (
      <h5 className="text-center">Sorry! There are no orders at this time!</h5>
    );
  }
  return (
    <Table
      fixedHeader={true}
      className="table-responsive"
      style={{ marginBottom: 50 }}
    >
      <TableHeader
        displaySelectAll={false}
      >
        <TableRow>
          <TableHeaderColumn colSpan="4" tooltip="All orders" style={{ textAlign: 'center' }}>
            All Orders
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn tooltip="Name of Buyer">Name of Buyer</TableHeaderColumn>
          <TableHeaderColumn tooltip="Phone Number">Phone Number</TableHeaderColumn>
          <TableHeaderColumn tooltip="Date Created">Created At</TableHeaderColumn>
          <TableHeaderColumn tooltip="Actions">View</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        showRowHover
        stripedRows
        displayRowCheckbox={false}
      >
        {orders.map(order => (
          <TableRow
            key={order.id} // eslint-disable-line
          >
            <TableRowColumn>{order.firstName} {order.lastName}</TableRowColumn>
            <TableRowColumn>{order.phoneNumber}</TableRowColumn>
            <TableRowColumn>
              <Moment
                date={order.createdAt}
              />
            </TableRowColumn>
            <TableRowColumn>
              <FlatButton
                label="View"
                primary={true}
                onTouchTap={() => changePage(`/dashboard/orders/${order.id}`)} // eslint-disable-line
              />
              <FlatButton
                label="Delete"
                secondary={true}
                onTouchTap={() => handleDeleteDialogOpen(order.id)} // eslint-disable-line
              />
            </TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function OrdersList({
  match,
  orders,
  changePage,
  deleteOrder,
  openSnackBar,
  handleDialogClose,
  handleDeleteDialogOpen,
  handleSnackRequestClose,
  openDialog,
}) {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={handleDialogClose}
    />,
    <FlatButton
      label="Delete"
      secondary={true}
      onTouchTap={deleteOrder}
    />,
  ];
  return (
    <div>
      <BreadCrumbs match={match} pageTitle="Orders" />
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div className="page-content">
              <h5>All orders</h5>
              {!orders
                ? <Spinner />
                : renderOrders(orders, changePage, handleDeleteDialogOpen)
              }
            </div>
          </div>
        </div>
      </div>
      <Dialog
        actions={actions}
        modal={false}
        open={openDialog}
        onRequestClose={this.handleDialogClose}
      >
        Are you sure?
      </Dialog>
      <Snackbar
        open={openSnackBar}
        message="Order Successfully Deleted!"
        autoHideDuration={4000}
        onRequestClose={handleSnackRequestClose}
      />
    </div>
  );
}

OrdersList.propTypes = {
  match: PropTypes.object.isRequired,
  orders: PropTypes.array,
  changePage: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  openSnackBar: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  handleDeleteDialogOpen: PropTypes.func.isRequired,
  handleSnackRequestClose: PropTypes.func.isRequired,
  openDialog: PropTypes.bool.isRequired,
};
