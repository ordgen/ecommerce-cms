import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-material/AutoForm';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import DropzoneComponent from '../../components/dropzone/Dropzone';
import { SubmitField, AutoField } from 'uniforms-material';
import Snackbar from 'material-ui/Snackbar';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import SiteConfigSchema from '../../../api/site-config/schema';
import './SiteConfig.css';

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
    width: '100%',
  },
  formElement: {
    display: 'block',
    width: '100%',
  },
};

const getSiteConfig = () =>
  new Promise((resolve, reject) =>
    Meteor.call('SiteConfig.methods.getSiteConfig',
      {},
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      },
    ),
  );

const updateSiteConfig = doc =>
  new Promise((resolve, reject) =>
    Meteor.call('SiteConfig.methods.updateSiteConfig',
      { ...doc },
      (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(err);
        }
      },
    ),
  );

class SiteConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      siteConfig: null,
      snackMessage: '',
      primaryLogo: '',
      secondaryLogo: '',
    };
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrimaryLogoImageUploaded = this.handlePrimaryLogoImageUploaded.bind(this);
    this.handleSecondaryLogoImageUploaded = this.handleSecondaryLogoImageUploaded.bind(this);
    this.handleImageUploadError = this.handleImageUploadError.bind(this);
  }

  componentWillMount() {
    getSiteConfig().then(
      (siteConfig) => {
        const { primaryLogo, secondaryLogo } = siteConfig;
        this.setState({ siteConfig, primaryLogo, secondaryLogo });
      },
    );
  }

  componentWillReceiveProps() {
    getSiteConfig().then(
      (siteConfig) => {
        const { primaryLogo, secondaryLogo } = siteConfig;
        this.setState({ siteConfig, primaryLogo, secondaryLogo });
      },
    );
  }

  handlePrimaryLogoImageUploaded(files) {
    if (files[0] && files[0].url) {
      this.setState({ secondaryLogo: files[0].url });
    } else {
      this.setState({ secondaryLogo: '' });
    }
  }

  handleSecondaryLogoImageUploaded(files) {
    if (files[0] && files[0].url) {
      this.setState({ secondaryLogo: files[0].url });
    } else {
      this.setState({ secondaryLogo: '' });
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

  handleSubmit(doc) {
    const { _id, siteName, companyPhones, companyEmails, socialMedia } = doc; // eslint-disable-line
    const { primaryLogo, secondaryLogo } = this.state;
    updateSiteConfig(
      {
        _id,
        siteName,
        primaryLogo,
        secondaryLogo,
        companyPhones,
        companyEmails,
        socialMedia,
      }).then(
      () => {
        this.setState({
          openSnackBar: true,
          snackMessage: 'Site Information Successfully Updated!',
        });
      },
    ).catch(
      () => {
        this.setState({
          openSnackBar: true,
          snackMessage: 'Oops! Update Failed!! Please try again.',
        });
      },
    );
  }

  render() {
    const { match } = this.props;
    const { openSnackBar, siteConfig, snackMessage, primaryLogo, secondaryLogo } = this.state;
    return (
      <div>
        <BreadCrumbs match={match} pageTitle="Site Information" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="page-content">
                <Paper style={styles.paperStyle}>
                  <div className="row">
                    <div className="col-md-8 col-lg-8 col-sm-8 col-xs-12">
                      {siteConfig &&
                        <AutoForm
                          schema={SiteConfigSchema}
                          onSubmit={this.handleSubmit}
                          model={siteConfig}
                          showInlineError
                        >
                          <AutoField name="siteName" />
                          <AutoField name="companyPhones" />
                          <AutoField name="companyEmails" />

                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Subheader
                              style={{ paddingLeft: 0 }}
                            >
                              Social Media Buttons
                            </Subheader>
                            <AutoField name="socialMedia.facebook.url" />
                            <AutoField name="socialMedia.facebook.isEnabled" />
                            <AutoField name="socialMedia.twitter.url" />
                            <AutoField name="socialMedia.twitter.isEnabled" />
                            <AutoField name="socialMedia.youtube.url" />
                            <AutoField name="socialMedia.youtube.isEnabled" />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Subheader
                              style={{ paddingLeft: 0 }}
                            >
                              Primary Logo
                            </Subheader>
                            <DropzoneComponent
                              files={[siteConfig.primaryLogo]}
                              onChange={this.handlePrimaryLogoImageUploaded}
                              accept="image/jpeg,image/jpg,image/tiff,image/gif"
                              multiple={false}
                              maxFiles={1}
                              onError={this.handleImageUploadError}
                              dropzoneText="Drag an image here"
                              dropBtnText="Select image"
                            />
                          </div>

                          <div>
                            <Subheader
                              style={{ paddingLeft: 0 }}
                            >
                              Secondary Logo
                            </Subheader>
                            <DropzoneComponent
                              files={[siteConfig.secondaryLogo]}
                              onChange={this.handleSecondaryLogoImageUploaded}
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
                          <div
                            style={{ display: 'none' }}
                          >
                            <AutoField
                              name="primaryLogo"
                              value={primaryLogo}
                            />
                            <AutoField
                              name="primaryLogo"
                              value={secondaryLogo}
                            />
                          </div>
                        </AutoForm>
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
      </div>
    );
  }
}

SiteConfig.propTypes = {
  match: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);

export default connect(null, mapDispatchToProps)(SiteConfig);
