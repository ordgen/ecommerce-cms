import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Header from '../shared/Header';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';


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

export default class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteConfig: null,
    };
  }

  componentWillMount() {
    getSiteConfig().then(
      (siteConfig) => {
        this.setState({
          siteConfig,
        });
      },
    );
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillReceiveProps() {
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
      <div className="ecommerce-cms-wrapper">
        <Header />
        <div className="ecommerce-cms-main-content clearfix">
          <article className="ecommerce-cms-article">
            <article className="ecommerce-cms-article-inner">
              <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
                <div className="container">
                  {siteConfig &&
                    <div className="row">
                      <div
                        className="col-md-6 col-lg-6 col-xs-12 col-sm-12"
                        style={{ marginBottom: 20 }}
                      >
                        <img
                          className="ecommerce-cms-about-logo img-fluid"
                          src={siteConfig ? siteConfig.primaryLogo : 'https://s3.amazonaws.com/loystar/wallville-logo.jpeg'}
                          alt="logo"
                        />
                      </div>
                      <div
                        className="col-md-6 col-lg-6 visible-md visible-lg col-xs-12 col-sm-12"
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, whiteSpace: 'pre-wrap' }}
                      >
                        {siteConfig.aboutUs}
                      </div>
                    </div>
                  }
                </div>
              </section>
            </article>
          </article>
        </div>
        <PrimaryFooter />
        <SecondaryFooter />
      </div>
    );
  }
}

