import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, CardActions, CardMedia } from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Spinner from '../../components/Spinner';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import { deleteSliderImage } from '../../actions/action-creators/SliderImages';
import { AllSliderImagesSelector } from '../../models/selectors/sliderImages';
import './SliderImages.css';

const style = {
  margin: 12,
};

class SliderImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      selectedImageId: null,
      openSnackBar: false,
    };
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogCloseWithPositive = this.handleDialogCloseWithPositive.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
  }

  handleDialogClose() {
    this.setState({ selectedImageId: null, openDialog: false });
  }

  handleDialogCloseWithPositive() {
    this.setState({ openDialog: false });
    this.props.deleteSliderImage(this.state.selectedImageId).then(
      () => this.setState({ openSnackBar: true }),
    );
  }

  handleSnackRequestClose() {
    this.setState({
      openSnackBar: false,
    });
  }

  renderImages(images) {
    if (images.length === 0) {
      return (
        <h5 className="text-center">Sorry! There are no Slider Images at this time!</h5>
      );
    }

    return images.map(image => (
      <Card
        key={image.id}
        style={{ marginBottom: 40 }}
      >
        <CardMedia>
          <img src={image.url} alt="" />
        </CardMedia>
        <CardActions>
          <FlatButton
            label="Edit"
            primary={true}
            onTouchTap={() => this.props.changePage(`/dashboard/slider-images/edit/${image.id}`)} // eslint-disable-line max-len
          />
          <FlatButton
            label="Delete"
            secondary={true}
            onTouchTap={() => this.setState({ openDialog: true, selectedImageId: image.id })} // eslint-disable-line max-len
          />
        </CardActions>
      </Card>
    ));
  }

  render() {
    const { match, images, isLoading } = this.props;
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
        <BreadCrumbs match={match} pageTitle="Slider" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="action-buttons">
                <ul>
                  <li>
                    <RaisedButton
                      label="Add New Image To Slider"
                      primary={true}
                      style={style}
                      containerElement={<Link to="/dashboard/slider-images/new" />}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="page-content">
                {isLoading
                  ? <Spinner />
                  : this.renderImages(images)
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
          message="Slider Image Successfully Deleted!"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackRequestClose}
        />
      </div>
    );
  }
}

SliderImages.propTypes = {
  match: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired,
  changePage: PropTypes.func.isRequired,
  deleteSliderImage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  images: AllSliderImagesSelector(state),
  isLoading: state.isLoading.isLoadingSliderImages,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteSliderImage,
  changePage: path => push(path),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SliderImages);
