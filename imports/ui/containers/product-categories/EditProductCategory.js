/* eslint-disable no-shadow */
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib';
import MenuItem from 'material-ui/MenuItem';
import { ProductCategoriesSelector, ProductCategorySelector } from '../../models/selectors/productCategories';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import { editProductCategory } from '../../actions/action-creators/ProductCategories';

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

class EditProductCategory extends Component {
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

  componentWillMount() {
    const { match, getCategory } = this.props;
    const category = getCategory(match.params.categoryId);
    if (category && category.parent) {
      this.setState({
        parentValue: category.parent.id,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match, getCategory } = nextProps;
    const category = getCategory(match.params.categoryId);
    if (category && category.parent) {
      this.setState({
        parentValue: category.parent.id,
      });
    }
  }

  onSubmit(data) {
    this.props.editProductCategory(
      {
        ...data,
        categoryId: this.props.match.params.categoryId,
      },
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
    const { match, getCategory, isLoading, productCategories } = this.props;
    const category = getCategory(match.params.categoryId);
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
                    {category &&
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
                          {EditProductCategory.ParentMenuItems([parentValue], productCategories)}
                        </FormsySelect>
                        <FormsyText
                          name="name"
                          required
                          hintText="What is the name of the category?"
                          floatingLabelText="Name of Category"
                          style={styles.formElement}
                          value={category.name}
                        />
                        <FormsyText
                          name="description"
                          required
                          hintText="What is this category about?"
                          floatingLabelText="Description"
                          style={styles.formElement}
                          value={category.description}
                        />
                        <RaisedButton
                          style={styles.submitStyle}
                          type="submit"
                          label="Submit"
                          primary={true}
                          disabled={!this.state.canSubmit || isLoading}
                        />
                      </Formsy.Form>
                    }
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
        <Snackbar
          open={openSnackBar}
          message="Category Successfully Updated!"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackRequestClose}
        />
      </div>
    );
  }
}

EditProductCategory.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  editProductCategory: PropTypes.func.isRequired,
  productCategories: PropTypes.array.isRequired,
  getCategory: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  productCategories: ProductCategoriesSelector(state),
  getCategory: categoryId => ProductCategorySelector(state, categoryId),
  isLoading: state.isLoading.isLoadingProductCategories,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  editProductCategory,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditProductCategory);
