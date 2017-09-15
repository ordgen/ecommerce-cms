import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../containers/Header';
import PrimaryFooter from '../footer/PrimaryFooter';
import SecondaryFooter from '../footer/SecondaryFooter';
import { resize } from '../../utils';

/* eslint-disable react/require-default-props */

export default function AboutUs({ siteConfig }) {
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
                        src={resize(siteConfig.aboutUsLogo, '500x500')}
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

AboutUs.propTypes = {
  siteConfig: PropTypes.object,
};
