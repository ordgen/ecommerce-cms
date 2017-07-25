/* eslint-disable no-shadow*/
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Paper from 'material-ui/Paper';
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib';
import MenuItem from 'material-ui/MenuItem';
import { ProductCategoriesSelector } from '../../models/selectors/productCategorySelectors';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import { createProduct } from '../../actions/ProductActionCreators';

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

class NewProduct extends Component {
  static ProductCategoryMenuItems(values, categoryItems) {
    return categoryItems.map(categoryItem => (
      <MenuItem
        key={categoryItem.id}
        insetChildren={true}
        checked={values && values.indexOf(categoryItem.id) > -1}
        value={categoryItem.id}
        primaryText={categoryItem.name}
      />
    ));
  }

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      categoryValue: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.errorMessages = {
      wordsError: 'Please only use letters',
      numericError: 'Please provide a number',
      urlError: 'Please provide a valid URL',
    };
  }

  onSubmit(data) {
    const args = { ...data, pictures: [data.pictures], user: this.props.user };
    this.props.createProduct(args).then(
      (res) => {
        if (res.success) {
          setTimeout(() => this.props.changePage('/dashboard/products'), 3000);
        } else {
          console.log(res.error);
        }
      });
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

  handleCategoryChange(event, value) {
    this.setState({ categoryValue: value });
  }

  render() {
    const { match, productCategories } = this.props;
    const { categoryValue } = this.state;
    const { numericError } = this.errorMessages;
    return (
      <div>
        <BreadCrumbs match={match} pageTitle="New Product" />
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
                        name="category"
                        hintText="Select product category"
                        style={styles.formElement}
                        onChange={this.handleCategoryChange}
                        value={categoryValue}
                        required
                      >
                        {NewProduct.ProductCategoryMenuItems([categoryValue], productCategories)}
                      </FormsySelect>
                      <FormsyText
                        name="name"
                        required
                        hintText="What is the name of the product?"
                        floatingLabelText="Name of Product"
                        style={styles.formElement}
                      />
                      <FormsyText
                        name="price"
                        validations="isNumeric"
                        validationError={numericError}
                        hintText="How much does the product cost?"
                        floatingLabelText="Price of Product"
                        required
                        style={styles.formElement}
                      />
                      <FormsyText
                        name="description"
                        floatingLabelText="Product Description"
                        hintText="Do you want to describe your product?"
                        style={styles.formElement}
                      />
                      <FormsyText
                        name="pictures"
                        floatingLabelText="Pictures"
                        required
                        style={styles.formElement}
                      />
                      <RaisedButton
                        style={styles.submitStyle}
                        type="submit"
                        label="Submit"
                        primary={true}
                        disabled={!this.state.canSubmit}
                      />
                    </Formsy.Form>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewProduct.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  createProduct: PropTypes.func.isRequired,
  productCategories: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  productCategories: ProductCategoriesSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createProduct,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);