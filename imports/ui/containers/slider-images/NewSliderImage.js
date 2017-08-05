/* eslint-disable no-shadow*/
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Paper from 'material-ui/Paper';
import { FormsyText } from 'formsy-material-ui/lib';
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
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.errorMessages = {
      wordsError: 'Please only use letters',
    };
  }

  onSubmit(data) {
    this.props.createSliderImage(
      data,
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
    console.log(this.state.formError)
  }

  render() {
    const { match } = this.props;
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
                      <FormsyText
                        name="image"
                        required
                        hintText="Image"
                        floatingLabelText="Image"
                        style={styles.formElement}
                      />
                      <FormsyText
                        name="link"
                        hintText="Does this image link to a page?"
                        floatingLabelText="Page Link"
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

NewSliderImage.propTypes = {
  match: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
  createSliderImage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  createSliderImage,
  changePage: path => push(path),
}, dispatch);

export default connect(null, mapDispatchToProps)(NewSliderImage);
