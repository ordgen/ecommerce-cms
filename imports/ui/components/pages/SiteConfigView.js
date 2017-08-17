import React from 'react';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-material/AutoForm';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { SubmitField, AutoField, SelectField, TextField } from 'uniforms-material';
import DropzoneComponent from '../dropzone/Dropzone';
import BreadCrumbs from '../BreadCrumbs';
import SiteConfigSchema from '../../../api/site-config/schema';

/* eslint-disable react/require-default-props */

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

export default function SiteConfigView({
  match,
  openSnackBar,
  siteConfig,
  snackMessage,
  primaryLogo,
  secondaryLogo,
  currency,
  handleCurrencyChange,
  handleSubmit,
  handlePrimaryLogoImageUploaded,
  handleSecondaryLogoImageUploaded,
  handleImageUploadError,
  handleSnackRequestClose,
}) {
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
                        onSubmit={handleSubmit}
                        model={siteConfig}
                        showInlineError
                      >
                        <AutoField name="siteName" />
                        <TextField
                          name="aboutUs"
                          multiLine
                          rows={5}
                        />
                        <AutoField name="companyPhones" />
                        <AutoField name="companyEmails" />
                        <SelectField
                          name="currency"
                          allowedValues={['US Dollar', 'Ghanaian Cedi']}
                          onChange={handleCurrencyChange}
                          value={currency}
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
                            onChange={handlePrimaryLogoImageUploaded}
                            accept="image/jpeg,image/jpg,image/tiff,image/gif"
                            multiple={false}
                            maxFiles={1}
                            onError={handleImageUploadError}
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
                            onChange={handleSecondaryLogoImageUploaded}
                            accept="image/jpeg,image/jpg,image/tiff,image/gif"
                            multiple={false}
                            maxFiles={1}
                            onError={handleImageUploadError}
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
          onRequestClose={handleSnackRequestClose}
        />
      </div>
    </div>
  );
}

SiteConfigView.propTypes = {
  match: PropTypes.object.isRequired,
  openSnackBar: PropTypes.bool.isRequired,
  siteConfig: PropTypes.object,
  snackMessage: PropTypes.string.isRequired,
  primaryLogo: PropTypes.string.isRequired,
  secondaryLogo: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  handleCurrencyChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlePrimaryLogoImageUploaded: PropTypes.func.isRequired,
  handleSecondaryLogoImageUploaded: PropTypes.func.isRequired,
  handleImageUploadError: PropTypes.func.isRequired,
  handleSnackRequestClose: PropTypes.func.isRequired,
};
