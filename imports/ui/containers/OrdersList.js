import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import OrdersList from '../components/pages/OrdersList';

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

class OrdersListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
    };
  }

  componentDidMount() {
    getOrders().then(
      (orders) => {
        this.setState({
          orders,
        });
      },
    );
  }

  render() {
    const { match, changePage } = this.props;
    const { orders } = this.state;
    return (
      <OrdersList
        match={match}
        changePage={changePage}
        orders={orders}
      />
    );
  }
}

OrdersListContainer.propTypes = {
  match: PropTypes.object.isRequired,
  orders: PropTypes.array, // eslint-disable-line
  changePage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);

export default connect(null, mapDispatchToProps)(OrdersListContainer);
