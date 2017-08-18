import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
import SiteConfigView from '../components/pages/SiteConfigView';
import { Currencies } from '../site-config';

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

class SiteConfigViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteConfig: null,
      openSnackBar: false,
      snackMessage: '',
      primaryLogo: '',
      secondaryLogo: '',
      currency: '',
    };
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrimaryLogoImageUploaded = this.handlePrimaryLogoImageUploaded.bind(this);
    this.handleSecondaryLogoImageUploaded = this.handleSecondaryLogoImageUploaded.bind(this);
    this.handleImageUploadError = this.handleImageUploadError.bind(this);
    this.handleSnackRequestClose = this.handleSnackRequestClose.bind(this);
  }

  componentDidMount() {
    getSiteConfig().then(
      (siteConfig) => {
        const { primaryLogo, secondaryLogo, currency: siteCurrency } = siteConfig;
        const currency = Currencies.find(c => c.symbol_native === siteCurrency);
        this.setState({
          siteConfig,
          primaryLogo,
          secondaryLogo,
          currency: currency ? currency.name : '',
        });
      },
    );
  }

  handleCurrencyChange(currency) {
    this.setState({ currency });
  }

  handlePrimaryLogoImageUploaded(files) {
    if (files[0] && files[0].url) {
      this.setState({ primaryLogo: files[0].url });
    } else {
      this.setState({ primaryLogo: '' });
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
    const { _id, siteName, companyPhones, companyEmails, socialMedia, aboutUs } = doc; // eslint-disable-line
    const { primaryLogo, secondaryLogo, currency: siteCurrency } = this.state;
    const currency = Currencies.find(c => c.name === siteCurrency);
    updateSiteConfig(
      {
        _id,
        siteName,
        primaryLogo,
        secondaryLogo,
        companyPhones,
        companyEmails,
        socialMedia,
        aboutUs,
        currency: currency ? currency.symbol_native : '',
      }).then(
      () => {
        this.setState({
          openSnackBar: true,
          snackMessage: 'Site Information Successfully Updated!',
        });
      },
    ).catch(
      (formError) => {
        this.setState({
          openSnackBar: true,
          snackMessage: 'Oops! Update Failed!! Please try again.',
          formError,
        });
      },
    );
  }

  render() {
    const {
      siteConfig,
      openSnackBar,
      primaryLogo,
      snackMessage,
      secondaryLogo,
      currency,
    } = this.state;
    const { match } = this.props;
    return (
      <SiteConfigView
        siteConfig={siteConfig}
        match={match}
        openSnackBar={openSnackBar}
        snackMessage={snackMessage}
        primaryLogo={primaryLogo}
        secondaryLogo={secondaryLogo}
        currency={currency}
        handleCurrencyChange={this.handleCurrencyChange}
        handleSubmit={this.handleSubmit}
        handlePrimaryLogoImageUploaded={this.handlePrimaryLogoImageUploaded}
        handleSecondaryLogoImageUploaded={this.handleSecondaryLogoImageUploaded}
        handleImageUploadError={this.handleImageUploadError}
        handleSnackRequestClose={this.handleSnackRequestClose}
      />
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
