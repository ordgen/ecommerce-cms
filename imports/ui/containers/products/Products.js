import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Moment from 'react-moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import BreadCrumbs from '../../components/BreadCrumbs';
import { deleteProduct } from '../../actions/action-creators/Products';
import { ProductsSelector } from '../../models/selectors/products';
import Spinner from '../../components/Spinner';
import './Products.css';

const style = {
  margin: 12,
};

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      selectedProductId: null,
      openSnackBar: false,
    };
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogCloseWithPositive = this.handleDialogCloseWithPositive.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
  }

  handleDialogClose() {
    this.setState({ selectedProductId: null, openDialog: false });
  }

  handleDialogCloseWithPositive() {
    this.setState({ openDialog: false });
    this.props.deleteProduct(this.state.selectedProductId).then(
      () => this.setState({ openSnackBar: true }),
    );
  }

  handleSnackRequestClose() {
    this.setState({
      openSnackBar: false,
    });
  }

  renderProducts(products) {
    if (products.length === 0) {
      return (
        <h5 className="text-center">Sorry! There are no Products at this time!</h5>
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
            <TableHeaderColumn colSpan="4" tooltip="All Products" style={{ textAlign: 'center' }}>
              All Products
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
            <TableHeaderColumn tooltip="Date Created">Created At</TableHeaderColumn>
            <TableHeaderColumn tooltip="Date Updated">Updated At</TableHeaderColumn>
            <TableHeaderColumn tooltip="Actions">Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover
          stripedRows
          displayRowCheckbox={false}
        >
          {products.map(product => (
            <TableRow
              key={product.id}
            >
              <TableRowColumn>{product.name}</TableRowColumn>
              <TableRowColumn>
                <Moment
                  date={product.createdAt}
                />
              </TableRowColumn>
              <TableRowColumn>{
                product.updatedAt
                  ? <TableRowColumn>
                    <Moment
                      date={product.updatedAt}
                    />
                  </TableRowColumn>
                  : ''
              }
              </TableRowColumn>
              <TableRowColumn>
                <FlatButton
                  label="Edit"
                  primary={true}
                  onTouchTap={() => this.props.changePage(`/dashboard/products/edit/${product.id}`)} // eslint-disable-line max-len
                />
                <FlatButton
                  label="Delete"
                  secondary={true}
                  onTouchTap={() => this.setState({ openDialog: true, selectedProductId: product.id })} // eslint-disable-line max-len
                />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  render() {
    const { match, products, isLoading } = this.props;
    const { openSnackBar, openDialog } = this.state;
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
        <BreadCrumbs match={match} pageTitle="Products" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="action-buttons">
                <ul>
                  <li>
                    <RaisedButton
                      label="Add New Product"
                      primary={true}
                      style={style}
                      containerElement={<Link to="/dashboard/products/new" />}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="page-content">
                <h5>All Products</h5>
                {isLoading
                  ? <Spinner />
                  : this.renderProducts(products)
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
          message="Product Successfully Deleted!"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackRequestClose}
        />
      </div>
    );
  }
}

Products.propTypes = {
  match: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
  changePage: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: ProductsSelector(state),
  isLoading: state.isLoading.isLoadingProducts,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteProduct,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Products);
