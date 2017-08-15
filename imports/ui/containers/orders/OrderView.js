import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import { deleteOrder } from '../../actions/action-creators/Orders';

/* eslint-disable jsx-a11y/href-no-hash, no-console */

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

class OrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      openSnackBar: false,
      order: null,
      isLoading: false,
    };
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
  }

  componentWillMount() {
    this.setState({
      isLoading: true,
    });
    const { match: { params: { orderId } } } = this.props;
    getOrder(orderId).then(
      (order) => {
        this.setState({ order, isLoading: false });
      },
    ).catch(
      (error) => {
        this.setState({
          isLoading: false,
        });
        console.log(error);
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: true,
    });
    const { match: { params: { orderId } } } = nextProps;
    getOrder(orderId).then(
      (order) => {
        this.setState({ order, isLoading: false });
      },
    ).catch(
      (error) => {
        this.setState({
          isLoading: false,
        });
        console.log(error);
      },
    );
  }

  handleDialogOpen() {
    this.setState({ openDialog: true });
  }

  handleDialogClose() {
    this.setState({ openDialog: false });
  }

  handleDialogCloseWithPositive() {
    
  }

  handleSnackRequestClose() {
    this.setState({
      openSnackBar: false,
    });
  }

  renderOrder(order) {
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
              Order Details (Total Order Cost = {tc})
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn colSpan="2" tooltip="Product" style={{ textAlign: 'center' }}>
              Product
            </TableHeaderColumn>
            <TableHeaderColumn tooltip="Product">Quantity</TableHeaderColumn>
            <TableHeaderColumn tooltip="Price">Price</TableHeaderColumn>
            <TableHeaderColumn tooltip="Price">Total Price</TableHeaderColumn>
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
  }

  render() {
    const { match } = this.props;
    const { openDialog, openSnackBar, order, isLoading } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        onTouchTap={this.handleDialogCloseWithPositive}
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
                  {isLoading
                    ? <Spinner />
                    : this.renderOrder(order)
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
          onRequestClose={this.handleDialogClose}
        >
          Are you sure?
        </Dialog>
        <Snackbar
          open={openSnackBar}
          message="Order Successfully Deleted!"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackRequestClose}
        />
      </div>
    );
  }
}

OrderView.propTypes = {
  match: PropTypes.object.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteOrder,
  changePage: path => push(path),
}, dispatch);

export default connect(null, mapDispatchToProps)(OrderView);
