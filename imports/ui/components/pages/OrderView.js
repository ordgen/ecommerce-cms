import React from 'react';
import PropTypes from 'prop-types';
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

/* eslint-disable jsx-a11y/href-no-hash, no-console */

const renderOrder = (order) => {
  let tc = 0;
  order.cartItems.forEach((item) => {
    tc += (parseInt(item.price, 10) * item.quantity);
  });
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
          <TableHeaderColumn colSpan="5" tooltip="Order Details" style={{ textAlign: 'center' }}>
            Order Details (Total Order Cost = {order.currency} {tc})
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn colSpan="2" tooltip="Product" style={{ textAlign: 'center' }}>
            Product
          </TableHeaderColumn>
          <TableHeaderColumn tooltip="Product">Quantity</TableHeaderColumn>
          <TableHeaderColumn tooltip="Price">Price ({order.currency})</TableHeaderColumn>
          <TableHeaderColumn tooltip="Price">Total Price ({order.currency})</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        showRowHover
        stripedRows
        displayRowCheckbox={false}
      >
        {order.cartItems.map(item => (
          <TableRow
            key={item._id} // eslint-disable-line
          >
            <TableRowColumn
              colSpan="2"
            >
              <div
                className="media"
                style={{ padding: 10 }}
              >
                <div className="media-left">
                  <a href="#">
                    <img
                      className="media-object"
                      src={item.image}
                      alt=""
                      style={{ borderRadius: 4, maxHeight: 120 }}
                    />
                  </a>
                </div>
                <div
                  className="media-body"
                  style={{ marginLeft: 10 }}
                >
                  <h5 className="media-heading">{item.name}</h5>
                </div>
              </div>
            </TableRowColumn>
            <TableRowColumn>{item.quantity}</TableRowColumn>
            <TableRowColumn>{item.price}</TableRowColumn>
            <TableRowColumn>{parseInt(item.price, 10) * item.quantity}</TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function OrderView({
  match,
  order,
  openSnackBar,
  openDialog,
  handleDialogClose,
  handleDialogCloseWithPositive,
  handleSnackRequestClose,
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
      onTouchTap={handleDialogCloseWithPositive}
    />,
  ];
  return (
    <div>
      <BreadCrumbs match={match} pageTitle="Order View" />
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            {order &&
              <div
                className="page-content"
                style={{ marginTop: 20, marginBottom: 80 }}
              >
                {!order
                  ? <Spinner />
                  : renderOrder(order)
                }
              </div>
            }
          </div>
        </div>
      </div>
      <Dialog
        actions={actions}
        modal={false}
        open={openDialog}
        onRequestClose={handleDialogClose}
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

OrderView.propTypes = {
  match: PropTypes.object.isRequired,
  order: PropTypes.object,
  openSnackBar: PropTypes.bool.isRequired,
  openDialog: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  handleDialogCloseWithPositive: PropTypes.func.isRequired,
  handleSnackRequestClose: PropTypes.func.isRequired,
};
