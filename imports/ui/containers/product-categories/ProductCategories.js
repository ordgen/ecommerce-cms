import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import BreadCrumbs from '../../components/BreadCrumbs';
import { deleteProductCategory } from '../../actions/action-creators/ProductCategories';
import { ProductCategoriesSelector } from '../../models/selectors/productCategories';
import Spinner from '../../components/Spinner';
import './ProductCategories.css';

/* eslint-disable max-len */

const style = {
  margin: 12,
};

export class ProductCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      selectedCategoryId: null,
      openSnackBar: false,
    };
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogCloseWithPositive = this.handleDialogCloseWithPositive.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
  }

  handleDialogClose() {
    this.setState({ selectedCategoryId: null, openDialog: false });
  }

  handleDialogCloseWithPositive() {
    this.setState({ openDialog: false });
    this.props.deleteProductCategory(this.state.selectedCategoryId).then(
      () => this.setState({ openSnackBar: true }),
    );
  }

  handleSnackRequestClose() {
    this.setState({
      openSnackBar: false,
    });
  }

  renderCategories(categories) {
    if (categories.length === 0) {
      return (
        <h5 className="text-center">Sorry! There are no Categories at this time!</h5>
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
            <TableHeaderColumn colSpan="4" tooltip="All Categories" style={{ textAlign: 'center' }}>
              All Categories
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
          {categories.map(category => (
            <TableRow
              key={category.id}
            >
              <TableRowColumn>{category.name}</TableRowColumn>
              <TableRowColumn>
                <Moment
                  date={category.createdAt}
                />
              </TableRowColumn>
              <TableRowColumn>{
                category.updatedAt
                  ? <TableRowColumn>
                    <Moment
                      date={category.updatedAt}
                    />
                  </TableRowColumn>
                  : ''
              }
              </TableRowColumn>
              <TableRowColumn>
                <FlatButton
                  label="Edit"
                  primary={true}
                  onTouchTap={() => this.props.changePage(`/dashboard/product-categories/edit/${category.id}`)} // eslint-disable-line max-len
                />
                <FlatButton
                  label="Delete"
                  secondary={true}
                  onTouchTap={() => this.setState({ openDialog: true, selectedCategoryId: category.id })} // eslint-disable-line max-len
                />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  render() {
    const { match, categories, isLoading } = this.props;
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
        <BreadCrumbs match={match} pageTitle="Product Categories" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="action-buttons">
                <ul>
                  <li>
                    <RaisedButton
                      label="Add New Category"
                      primary={true}
                      style={style}
                      containerElement={<Link to="/dashboard/product-categories/new" />}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="page-content">
                <h5>All Categories</h5>
                {isLoading
                  ? <Spinner />
                  : this.renderCategories(categories)
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
          Are you sure? All products and sub-categories associated with this category will be deleted as well.
        </Dialog>
        <Snackbar
          open={openSnackBar}
          message="Category Successfully Deleted!"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackRequestClose}
        />
      </div>
    );
  }
}

ProductCategories.propTypes = {
  match: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  changePage: PropTypes.func.isRequired,
  deleteProductCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categories: ProductCategoriesSelector(state),
  isLoading: state.isLoading.isLoadingProductCategories,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteProductCategory,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories);
