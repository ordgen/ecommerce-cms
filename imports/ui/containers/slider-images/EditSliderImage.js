/* eslint-disable no-shadow */
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Snackbar from 'material-ui/Snackbar';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import { FormsyText } from 'formsy-material-ui/lib';
import DropzoneComponent from '../../components/dropzone/Dropzone';
import BreadCrumbs from '../../components/BreadCrumbs';
import { editSliderImage } from '../../actions/action-creators/SliderImages';
import { SliderImageSelector } from '../../models/selectors/sliderImages';

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

class EditSliderImage extends Component {
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

  componentWillMount() {
    const { match, getImage } = this.props;
    const sliderImage = getImage(match.params.imageId);
    if (sliderImage) {
      this.setState({
        images: [sliderImage.url],
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match, getImage } = nextProps;
    const sliderImage = getImage(match.params.imageId);
    if (sliderImage) {
      this.setState({
        images: [sliderImage.url],
      });
    }
  }

  onSubmit(data) {
    this.props.editSliderImage(
      {
        imageId: this.props.match.params.imageId,
        url: data.images[0],
        pageLink: data.page_link,
      },
    ).then(
      () => {
        this.setState({
          openSnackBar: true,
          snackMessage: 'Slider Image Successfully Updated!',
        });
        setTimeout(() => this.props.changePage('/dashboard/slider-images'), 3000);
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
    const { match, isLoading, getImage } = this.props;
    const { images, snackMessage, openSnackBar } = this.state;
    const sliderImage = getImage(match.params.imageId);
    return (
      <div>
        <BreadCrumbs match={match} pageTitle="New Slider Image" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <Paper style={styles.paperStyle}>
                <div className="row">
                  <div className="col-md-8 col-lg-8 col-sm-8 col-xs-12">
                    {sliderImage &&
                      <Formsy.Form
                        onValidSubmit={this.onSubmit}
                        onValid={this.enableSubmitButton}
                        onInvalid={this.disableSubmitButton}
                      >
                        <Subheader
                          style={{ paddingLeft: 0 }}
                        >
                          Slide Image (Recommended size = 3376 x 560)
                        </Subheader>
                        <DropzoneComponent
                          files={[sliderImage.url]}
                          onChange={this.handleImageUploaded}
                          accept="image/jpeg,image/jpg,image/tiff,image/gif"
                          multiple={false}
                          maxFiles={1}
                          onError={this.handleImageUploadError}
                          dropzoneText="Drag an image here"
                          dropBtnText="Select image"
                        />
                        <Subheader
                          style={{ paddingLeft: 0 }}
                        >
                          Page Link (eg. /contact-us)
                        </Subheader>
                        <FormsyText
                          name="page_link"
                          hintText="Does this image link to a page?"
                          floatingLabelText="Page Link (optional)"
                          style={styles.formElement}
                          value={sliderImage.pageLink}
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

EditSliderImage.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  editSliderImage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getImage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading.isLoadingSliderImages,
  getImage: imageId => SliderImageSelector(state, imageId),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  editSliderImage,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditSliderImage);
