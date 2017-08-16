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
import { ProductSelector } from '../../models/selectors/products';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import DropzoneComponent from '../../components/dropzone/Dropzone';
import { editProduct } from '../../actions/action-creators/Products';

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

class EditProduct extends Component {
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
      formError: null,
      images: [],
      openSnackBar: false,
      snackMessage: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleImageUploaded = this.handleImageUploaded.bind(this);
    this.handleImageUploadError = this.handleImageUploadError.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
    this.errorMessages = {
      numericError: 'Please provide a number',
    };
  }

  componentWillMount() {
    const { match, getProduct } = this.props;
    const product = getProduct(match.params.productId);
    if (product) {
      this.setState({
        categoryValue: product.category.id,
        images: product.pictures,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match, getProduct } = nextProps;
    const product = getProduct(match.params.productId);
    if (product) {
      this.setState({
        categoryValue: product.category.id,
        images: product.pictures,
      });
    }
  }

  onSubmit(data) {
    this.props.editProduct(
      {
        ...data,
        productId: this.props.match.params.productId,
        price: parseFloat(data.price, 10),
      },
    ).then(
      () => {
        this.setState({
          openSnackBar: true,
          snackMessage: 'Product Successfully Updated!',
        });
        setTimeout(() => this.props.changePage('/dashboard/products'), 3000);
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

  handleCategoryChange(event, value) {
    this.setState({ categoryValue: value });
  }

  handleImageUploaded(files) {
    const images = [];
    files.map(file => images.push(file.url));
    this.setState({ images });
  }

  handleImageUploadError(error) {
    this.setState({
      openSnackBar: true,
      snackMessage: error,
    });
  }


  handleSnackRequestClose() {
    this.setState({
      openSnackBar: false,
    });
  }

  render() {
    const { match, productCategories, getProduct } = this.props;
    const { categoryValue, images, openSnackBar, snackMessage, formError } = this.state; // eslint-disable-line
    const { numericError } = this.errorMessages;
    const product = getProduct(match.params.productId);
    return (
      <div>
        <BreadCrumbs match={match} pageTitle="Update Product" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <Paper style={styles.paperStyle}>
                <div className="row">
                  <div className="col-md-8 col-lg-8 col-sm-8 col-xs-12">
                    {product &&
                      <Formsy.Form
                        onValidSubmit={this.onSubmit}
                        onValid={this.enableSubmitButton}
                        onInvalid={this.disableSubmitButton}
                      >
                        <FormsySelect
                          name="productCategoryId"
                          hintText="Select product category"
                          style={styles.formElement}
                          onChange={this.handleCategoryChange}
                          value={categoryValue}
                          required
                        >
                          {EditProduct.ProductCategoryMenuItems([categoryValue], productCategories)}
                        </FormsySelect>
                        <FormsyText
                          name="name"
                          required
                          hintText="What is the name of the product?"
                          floatingLabelText="Name of Product"
                          style={styles.formElement}
                          value={product.name}
                        />
                        <FormsyText
                          name="price"
                          validations="isNumeric"
                          validationError={numericError}
                          hintText="How much does the product cost?"
                          floatingLabelText="Price of Product"
                          required
                          style={styles.formElement}
                          value={product.price}
                        />
                        <FormsyText
                          name="description"
                          floatingLabelText="Product Description"
                          hintText="What is this product about?"
                          style={styles.formElement}
                          value={product.description}
                          multiLine
                        />
                        <div
                          style={{ marginTop: 20 }}
                        >
                          <DropzoneComponent
                            files={product.pictures}
                            onChange={this.handleImageUploaded}
                            accept="image/jpeg,image/jpg,image/tiff,image/gif"
                            maxFiles={4}
                            onError={this.handleImageUploadError}
                            dropzoneText="Drag pictures here"
                            dropBtnText="Select pictures"
                          />
                        </div>
                        <RaisedButton
                          style={styles.submitStyle}
                          type="submit"
                          label="Submit"
                          primary={true}
                          disabled={!this.state.canSubmit}
                        />
                        <div
                          style={{ display: 'none' }}
                        >
                          <FormsyText
                            name="pictures"
                            required
                            validations="minLength:1"
                            value={images}
                          />
                        </div>
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
          message={snackMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackRequestClose}
        />
      </div>
    );
  }
}

EditProduct.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  productCategories: PropTypes.array.isRequired,
  getProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  productCategories: ProductCategoriesSelector(state),
  getProduct: productId => ProductSelector(state, productId),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  editProduct,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
