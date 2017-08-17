/* eslint-disable no-shadow */
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib';
import MenuItem from 'material-ui/MenuItem';
import { ProductCategoriesSelector } from '../../models/selectors/productCategories';
import BreadCrumbs from '../../components/BreadCrumbs';
import { createProductCategory } from '../../actions/action-creators/ProductCategories';

const styles = {
  paperStyle: {
    padding: 20,
    marginTop: 15,
    minHeight: 500,
  },
  switchStyle: {
    marginBottom: 16,
  },
  submitStyle: {
    marginTop: 32,
    display: 'block',
  },
  formElement: {
    display: 'block',
    width: '100%',
  },
};

class NewProductCategory extends Component {
  static ParentMenuItems(values, parentItems) {
    return parentItems.map(parentItem => (
      <MenuItem
        key={parentItem.id}
        insetChildren={true}
        checked={values && values.indexOf(parentItem.id) > -1}
        value={parentItem.id}
        primaryText={parentItem.name}
      />
    ));
  }

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      parentValue: null,
      openSnackBar: false,
      formError: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.handleParentChange = this.handleParentChange.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
  }

  onSubmit(data) {
    this.props.createProductCategory(
      data,
    ).then(
      () => {
        this.setState({
          openSnackBar: true,
        });
        setTimeout(() => this.props.changePage('/dashboard/product-categories'), 3000);
      },
    ).catch(reason => this.setState({ formError: reason }));
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

  handleParentChange(event, value) {
    this.setState({ parentValue: value });
  }

  handleSnackRequestClose() {
    this.setState({
      openSnackBar: false,
    });
  }

  render() {
    const { match, productCategories, isLoading } = this.props;
    const { parentValue, openSnackBar } = this.state;
    return (
      <div>
        <BreadCrumbs match={match} pageTitle="New Category" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <Paper style={styles.paperStyle}>
                <div className="row">
                  <div className="col-md-8 col-lg-8 col-sm-8 col-xs-12">
                    <Formsy.Form
                      onValidSubmit={this.onSubmit}
                      onValid={this.enableSubmitButton}
                      onInvalid={this.disableSubmitButton}
                    >
                      <FormsySelect
                        name="parent"
                        hintText="Select the parent of this category (optional)"
                        style={styles.formElement}
                        onChange={this.handleParentChange}
                        value={parentValue}
                      >
                        {NewProductCategory.ParentMenuItems([parentValue], productCategories)}
                      </FormsySelect>
                      <FormsyText
                        name="name"
                        required
                        hintText="What is the name of the category?"
                        floatingLabelText="Name of Category"
                        style={styles.formElement}
                      />
                      <FormsyText
                        name="description"
                        required
                        hintText="What is this category about?"
                        floatingLabelText="Description"
                        style={styles.formElement}
                      />
                      <RaisedButton
                        style={styles.submitStyle}
                        type="submit"
                        label="Submit"
                        primary={true}
                        disabled={!this.state.canSubmit || isLoading}
                      />
                    </Formsy.Form>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
        <Snackbar
          open={openSnackBar}
          message="Product Category Successfully Created!"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackRequestClose}
        />
      </div>
    );
  }
}

NewProductCategory.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  createProductCategory: PropTypes.func.isRequired,
  productCategories: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  productCategories: ProductCategoriesSelector(state),
  isLoading: state.isLoading.isLoadingProductCategories,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createProductCategory,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewProductCategory);
