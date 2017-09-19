import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../containers/Header';
import PrimaryFooter from '../footer/PrimaryFooter';
import SecondaryFooter from '../footer/SecondaryFooter';
import { resize } from '../../utils';

/* eslint-disable react/require-default-props */

export default function ContactUs({ siteConfig }) {
  return (
    <div className="ecommerce-cms-wrapper">
      <Header />
      <div className="ecommerce-cms-main-content clearfix">
        <article className="ecommerce-cms-article">
          <article className="ecommerce-cms-article-inner">
            <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                    {siteConfig &&
                      <div>
                        <h5>Call Us</h5>
                        <p>{siteConfig.companyPhones.join(', ')}</p>
                        <h5>Email Us</h5>
                        <p>{siteConfig.companyEmails.join(', ')}</p>
                        <h5>Company Details</h5>
                        <p>Location: North Legon, Accra.</p>
                      </div>
                    }
                  </div>
                  <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
                    <img
                      className="ecommerce-cms-about-logo img-fluid"
                      src={resize('https://s3.amazonaws.com/wallville-live/contact.jpg', '500x500')}
                    />
                  </div>
                </div>
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

ContactUs.propTypes = {
  siteConfig: PropTypes.object,
};
