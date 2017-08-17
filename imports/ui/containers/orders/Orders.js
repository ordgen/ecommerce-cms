import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import { OrdersSelector } from '../../models/selectors/orders';
import Spinner from '../../components/Spinner';
import './Orders.css';

const getOrders = () =>
  new Promise((resolve, reject) =>
    Meteor.call('Orders.methods.getAllOrders',
      {},
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      },
    ),
  );

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.state = {
      isLoading: true,
    };
    getOrders().then(
      (orders) => {
        this.setState({
          orders,
          isLoading: false,
        });
      },
    );
  }

  renderOrders(orders) {
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
              key={order._id} // eslint-disable-line
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
                  onTouchTap={() => this.props.changePage(`/dashboard/orders/${order._id}`)} // eslint-disable-line
                />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  render() {
    const { match } = this.props;
    const { orders, isLoading } = this.state;
    return (
      <div>
        <BreadCrumbs match={match} pageTitle="Orders" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="page-content">
                <h5>All orders</h5>
                {isLoading
                  ? <Spinner />
                  : this.renderOrders(orders)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Orders.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);

export default connect(null, mapDispatchToProps)(Orders);