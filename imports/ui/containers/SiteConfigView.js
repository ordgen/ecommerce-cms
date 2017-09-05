import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
import AutoForm from 'uniforms-material/AutoForm';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { SubmitField, AutoField, SelectField, TextField } from 'uniforms-material';
import { Currencies as currencies } from '../site-config';
import DropzoneComponent from '../components/dropzone/Dropzone';
import BreadCrumbs from '../components/BreadCrumbs';
import SiteConfigSchema from '../../api/site-config/schema';

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

class SiteConfigViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteConfig: null,
      openSnackBar: false,
      snackMessage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrimaryLogoImageUploaded = this.handlePrimaryLogoImageUploaded.bind(this);
    this.handleSecondaryLogoImageUploaded = this.handleSecondaryLogoImageUploaded.bind(this);
    this.handleImageUploadError = this.handleImageUploadError.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
    this.handleAboutUsLogoUploaded = this.handleAboutUsLogoUploaded.bind(this);
  }

  componentDidMount() {
    getSiteConfig().then(
      (siteConfig) => {
        if (!siteConfig.aboutUsLogo) {
          const config = {
            ...siteConfig,
            aboutUsLogo: '',
          };
          this.setState({ siteConfig: config });
        } else {
          this.setState({
            siteConfig,
          });
        }
      },
    );
  }

  handlePrimaryLogoImageUploaded(files) {
    let siteConfig = this.form.getModel();
    if (files[0] && files[0].url) {
      siteConfig = {
        ...siteConfig,
        primaryLogo: files[0].url,
      };
    } else {
      siteConfig = {
        ...siteConfig,
        primaryLogo: '',
      };
    }
    this.setState({ siteConfig });
  }

  handleSecondaryLogoImageUploaded(files) {
    let siteConfig = this.form.getModel();
    if (files[0] && files[0].url) {
      siteConfig = {
        ...siteConfig,
        secondaryLogo: files[0].url,
      };
    } else {
      siteConfig = {
        ...siteConfig,
        secondaryLogo: '',
      };
    }
    this.setState({ siteConfig });
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
    updateSiteConfig(doc).then(
      () => {
        this.setState({
          openSnackBar: true,
          snackMessage: 'Site Information Successfully Updated!',
        });
      },
    ).catch(
      (error) => {
        this.setState({
          openSnackBar: true,
          snackMessage: error.message,
        });
      },
    );
  }

  handleAboutUsLogoUploaded(files) {
    let siteConfig = this.form.getModel();
    if (files[0] && files[0].url) {
      siteConfig = {
        ...siteConfig,
        aboutUsLogo: files[0].url,
      };
    } else {
      siteConfig = {
        ...siteConfig,
        aboutUsLogo: '',
      };
    }
    this.setState({ siteConfig });
  }

  render() {
    const {
      siteConfig,
      openSnackBar,
      snackMessage,
    } = this.state;
    const { match } = this.props;
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
                          ref={(ref) => { this.form = ref; }}
                        >
                          <AutoField name="siteName" />
                          <TextField
                            name="aboutUs"
                            multiLine
                            rows={5}
                          />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Subheader
                              style={{ paddingLeft: 0 }}
                            >
                              About Us Logo
                            </Subheader>
                            <DropzoneComponent
                              files={siteConfig.aboutUsLogo ? [siteConfig.aboutUsLogo] : []}
                              onChange={this.handleAboutUsLogoUploaded}
                              accept="image/jpeg,image/jpg,image/tiff,image/gif"
                              multiple={false}
                              maxFiles={1}
                              onError={this.handleImageUploadError}
                              dropzoneText="Drag an image here"
                              dropBtnText="Select image"
                            />
                          </div>
                          <AutoField name="companyPhones" />
                          <AutoField name="companyEmails" />
                          <SelectField
                            name="currency"
                            allowedValues={currencies.map(c => c.symbol_native)}
                            transform={val => (currencies.find(c => c.symbol_native === val)).name}
                          />
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

SiteConfigViewContainer.propTypes = {
  match: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);

export default connect(null, mapDispatchToProps)(SiteConfigViewContainer);
