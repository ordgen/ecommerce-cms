/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Snackbar from 'material-ui/Snackbar';
import AutoForm from 'uniforms-material/AutoForm';
import Subheader from 'material-ui/Subheader';
import { SubmitField, SelectField, TextField } from 'uniforms-material';
import Paper from 'material-ui/Paper';
import BreadCrumbs from '../../components/BreadCrumbs';
import DropzoneComponent from '../../components/dropzone/Dropzone';
import { selectEntities } from '../../models/selectors/selectEntities';
import orm from '../../models/orm';
import ProductSchema from '../../../api/products/schema';
import { createProduct } from '../../actions/action-creators/Products';

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
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: '',
        productCategoryId: '',
        pictures: [],
        shortDescription: '',
        description: '',
        price: '',
        discount: '',
      },
      openSnackBar: false,
      snackMessage: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleImageUploaded = this.handleImageUploaded.bind(this);
    this.handleImageUploadError = this.handleImageUploadError.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  onSubmit(doc) {
    this.props.createProduct({
      ...doc,
      price: parseFloat(doc.price, 10),
      discount: doc.discount ? parseFloat(doc.discount, 10) : null,
    }).then(
      () => {
        this.setState({
          openSnackBar: true,
          snackMessage: 'Product Successfully Created!',
        });
        setTimeout(() => this.props.changePage('/dashboard/products'), 3000);
      },
    ).catch((error) => {
      this.setState({
        openSnackBar: true,
        snackMessage: error.message,
      });
    });
  }

  onValidate(model, error, callback) {
    if (error) {
      this.setState({
        openSnackBar: true,
        snackMessage: error.message,
      });
      return callback();
    }

    return callback(null);
  }

  handleImageUploaded(files) {
    let product = this.form.getModel();
    if (files.length > 0) {
      const pictures = [];
      files.map(file => pictures.push(file.url));
      product = {
        ...product,
        pictures,
      };
      this.setState({ product });
    } else {
      product = {
        ...product,
        pictures: [],
      };
      this.setState({ product });
    }
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
    const { match, productCategories } = this.props;
    const { openSnackBar, snackMessage, product } = this.state;
    return (
      <div>
        <BreadCrumbs match={match} pageTitle="New Product" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <Paper style={styles.paperStyle}>
                <div className="row">
                  <div className="col-md-8 col-lg-8 col-sm-8 col-xs-12">
                    <AutoForm
                      schema={ProductSchema}
                      onSubmit={this.onSubmit}
                      onValidate={this.onValidate}
                      model={product}
                      showInlineError
                      ref={(ref) => { this.form = ref; }}
                    >
                      <SelectField
                        name="productCategoryId"
                        allowedValues={productCategories.map(p => p.id)}
                        transform={val => (productCategories.find(p => p.id === val)).name}
                      />

                      <TextField name="name" />
                      <TextField
                        name="shortDescription"
                        multiLine
                        rows={2}
                      />
                      <TextField name="price" />
                      <TextField name="discount" />
                      <TextField
                        name="description"
                        multiLine
                        rows={5}
                      />

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Subheader
                          style={{ paddingLeft: 0 }}
                        >
                          pictures
                        </Subheader>
                        <DropzoneComponent
                          files={product.pictures}
                          onChange={this.handleImageUploaded}
                          accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
                          maxFiles={4}
                          onError={this.handleImageUploadError}
                          dropzoneText="Drag pictures here"
                          dropBtnText="Select pictures"
                        />
                      </div>
                      <div>
                        <SubmitField
                          primary
                          style={styles.submitStyle}
                        />
                      </div>
                    </AutoForm>
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

NewProduct.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  createProduct: PropTypes.func.isRequired,
  productCategories: PropTypes.array, // eslint-disable-line
};

const mapStateToProps = (state) => {
  const entities = selectEntities(state);
  const session = orm.session(entities);
  const { ProductCategory } = session;
  return {
    productCategories: ProductCategory.all().toRefArray().reverse(),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  createProduct,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
