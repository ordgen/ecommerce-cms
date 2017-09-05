import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
import { createOrder } from '../actions/action-creators/Orders';
import OrderSummary from '../components/pages/OrderSummary';
import { selectCartItems } from '../models/selectors/selectCartItems';
import cartItemOrm from '../models/cartItemOrm';

const getSiteConfig = () =>
  new Promise((resolve, reject) =>
    Meteor.call('SiteConfig.methods.getSiteConfig',
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

class OrderSummaryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteConfig: null,
      openFormDialog: false,
      canSubmit: false,
      openSuccessDialog: false,
    };
    this.handleFormDialogClose = this.handleFormDialogClose.bind(this);
    this.handleFormDialogOpen = this.handleFormDialogOpen.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.handleSuccessDialogClose = this.handleSuccessDialogClose.bind(this);
    this.handleSuccessDialogOpen = this.handleSuccessDialogOpen.bind(this);
    this.handleSuccessDialogCloseWithPositive = this.handleSuccessDialogCloseWithPositive.bind(this); // eslint-disable-line
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
  }

  componentDidMount() {
    getSiteConfig().then(
      (siteConfig) => {
        this.setState({
          siteConfig,
        });
      },
    );
  }

  handleFormDialogClose() {
    this.setState({ openFormDialog: false });
  }

  handleFormDialogOpen() {
    this.setState({ openFormDialog: true });
  }

  handleSuccessDialogClose() {
    this.setState({ openSuccessDialog: false });
  }

  handleSuccessDialogOpen() {
    this.setState({ openSuccessDialog: true });
  }

  handleSuccessDialogCloseWithPositive() {
    this.setState({ openSuccessDialog: false });
    setTimeout(() => this.props.changePage('/'), 2000);
  }

  handleFormSubmission(data) {
    const { createOrder: create, cartItems } = this.props;
    create(
      {
        ...data,
        cartItems,
      },
    ).then(
      () => {
        this.setState({
          openFormDialog: false,
          openSuccessDialog: true,
        });
      },
    ).catch(reason => this.setState({ formError: reason, openFormDialog: false }));
  }

  enableSubmitButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableSubmitButton() {
    this.setState({
      canSubmit: false,
    });
  }

  render() {
    const {
      siteConfig,
      openFormDialog,
      canSubmit,
      openSuccessDialog,
    } = this.state;
    const { cartItems } = this.props;
    return (
      <OrderSummary
        siteConfig={siteConfig}
        cartItems={cartItems}
        openFormDialog={openFormDialog}
        canSubmit={canSubmit}
        openSuccessDialog={openSuccessDialog}
        handleFormDialogClose={this.handleFormDialogClose}
        handleFormDialogOpen={this.handleFormDialogOpen}
        handleFormSubmission={this.handleFormSubmission}
        handleSuccessDialogClose={this.handleSuccessDialogClose}
        handleSuccessDialogCloseWithPositive={this.handleSuccessDialogCloseWithPositive}
        enableSubmitButton={this.enableSubmitButton}
        disableSubmitButton={this.disableSubmitButton}
      />
    );
  }
}

OrderSummaryContainer.propTypes = {
  createOrder: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  cartItems: PropTypes.array, // eslint-disable-line
};

const mapStateToProps = (state) => {
  const cartItemEntities = selectCartItems(state);
  const cartItemsSession = cartItemOrm.session(cartItemEntities);
  const { CartItem } = cartItemsSession;
  return {
    cartItems: CartItem.all().toRefArray(),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  createOrder,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryContainer);
