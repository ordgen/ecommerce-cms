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
import ProductCategorySchema from '../../../api/product-categories/schema';
import Spinner from '../../components/Spinner';
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

class NewProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      openSnackBar: false,
      snackMessage: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleImageUploaded = this.handleImageUploaded.bind(this);
    this.handleImageUploadError = this.handleImageUploadError.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  componentWillMount() {
    const { category } = this.props;
    if (category) {
      this.setState({
        category,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { category } = nextProps;
    if (category) {
      this.setState({
        category,
      });
    }
  }

  onSubmit(doc) {
    this.props.editProductCategory({
      ...doc,
      parent: doc.parent ? doc.parent : null,
      categoryId: this.props.match.params.categoryId,
    }).then(
      () => {
        this.setState({
          openSnackBar: true,
          snackMessage: 'Product Category Successfully Updated!',
        });
        setTimeout(() => this.props.changePage('/dashboard/product-categories'), 3000);
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
    let category = this.form.getModel();
    if (files.length > 0) {
      category = {
        ...category,
        picture: files[0].url,
      };
      this.setState({ category });
    } else {
      category = {
        ...category,
        picture: '',
      };
      this.setState({ category });
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
    const { openSnackBar, snackMessage, category } = this.state;
    return (
      <div>
        <BreadCrumbs match={match} pageTitle="Update Product Category" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <Paper style={styles.paperStyle}>
                <div className="row">
                  <div className="col-md-8 col-lg-8 col-sm-8 col-xs-12">
                    {category
                      ? <AutoForm
                        schema={ProductCategorySchema}
                        onSubmit={this.onSubmit}
                        onValidate={this.onValidate}
                        model={category}
                        showInlineError
                        ref={(ref) => { this.form = ref; }}
                      >
                        <SelectField
                          name="parent"
                          allowedValues={productCategories.map(p => p.id)}
                          transform={val => (productCategories.find(p => p.id === val)).name}
                        />

                        <TextField name="name" />
                        <TextField
                          name="description"
                          multiLine
                          rows={5}
                        />

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Subheader
                            style={{ paddingLeft: 0 }}
                          >
                            Cover Image
                          </Subheader>
                          <DropzoneComponent
                            files={category.picture ? [category.picture] : []}
                            onChange={this.handleImageUploaded}
                            accept="image/jpeg,image/jpg,image/tiff,image/gif"
                            multiple={false}
                            maxFiles={1}
                            onError={this.handleImageUploadError}
                            dropzoneText="Drag an image here"
                            dropBtnText="Select image"
                          />
                        </div>
                        <div>
                          <SubmitField
                            primary
                            style={styles.submitStyle}
                          />
                        </div>
                      </AutoForm>
                      : <Spinner />
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

NewProductCategory.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  editProductCategory: PropTypes.func.isRequired,
  productCategories: PropTypes.array, // eslint-disable-line
  category: PropTypes.object // eslint-disable-line
};

const mapStateToProps = (state, routeParams) => {
  const { match: { params: { categoryId } } } = routeParams;
  const entities = selectEntities(state);
  const session = orm.session(entities);
  const { ProductCategory } = session;
  let category;
  if (ProductCategory.hasId(categoryId)) {
    const pc = ProductCategory.withId(categoryId).ref;
    const { name, picture, description, parent } = pc;
    category = {
      name,
      picture,
      description,
      parent,
    };
  }
  return {
    category,
    productCategories: ProductCategory.all().toRefArray().reverse(),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  editProductCategory,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewProductCategory);
