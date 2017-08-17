import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import AboutUs from '../components/pages/AboutUs';

/* eslint-disable react/require-default-props */

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

class AboutUsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteConfig: null,
    };
  }

  componentDidMount() {
    getSiteConfig().then(
      (siteConfig) => {
        this.setState({
          siteConfig,
        });
      },
    );
  }

  render() {
    const { siteConfig } = this.state;
    return (
      <AboutUs
        siteConfig={siteConfig}
      />
    );
  }
}

export default AboutUsContainer;
