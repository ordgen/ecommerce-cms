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
import { FormsyText } from 'formsy-material-ui/lib';
import DropzoneComponent from '../../components/dropzone/Dropzone';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import { createSliderImage } from '../../actions/action-creators/SliderImages';

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

class NewSliderImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      formError: null,
      images: [],
      openSnackBar: false,
      snackMessage: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.handleImageUploaded = this.handleImageUploaded.bind(this);
    this.handleImageUploadError = this.handleImageUploadError.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
    this.errorMessages = {
      wordsError: 'Please only use letters',
    };
  }

  onSubmit(data) {
    this.props.createSliderImage(
      {
        url: data.images[0],
        pageLink: data.page_link,
      },
    ).then(
      () => setTimeout(() => this.props.changePage('/dashboard/slider-images'), 3000),
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
    const { match, isLoading } = this.props;
    const { images, snackMessage, openSnackBar } = this.state;
    console.log(this.state.formError);
    return (
      <div>
        <BreadCrumbs match={match} pageTitle="New Slider Image" />
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
                      <DropzoneComponent
                        onChange={this.handleImageUploaded}
                        accept="image/jpeg,image/jpg,image/tiff,image/gif"
                        multiple={false}
                        maxFiles={1}
                        onError={this.handleImageUploadError}
                        dropzoneText="Drag an image here"
                        dropBtnText="Select image"
                      />
                      <FormsyText
                        name="page_link"
                        hintText="Does this image link to a page?"
                        floatingLabelText="Page Link"
                        style={styles.formElement}
                      />
                      <RaisedButton
                        style={styles.submitStyle}
                        type="submit"
                        label="Submit"
                        primary={true}
                        disabled={!this.state.canSubmit || isLoading}
                      />
                      <div
                        style={{ display: 'none' }}
                      >
                        <FormsyText
                          name="images"
                          required
                          validations="minLength:1"
                          value={images}
                        />
                      </div>
                    </Formsy.Form>
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

NewSliderImage.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  createSliderImage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading.isLoadingSliderImages,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createSliderImage,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewSliderImage);
