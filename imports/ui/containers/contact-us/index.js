import React from 'react';
import Header from '../Header';
import PrimaryFooter from '../../components/footer/PrimaryFooter';
import SecondaryFooter from '../../components/footer/SecondaryFooter';


const ContactUs = function ContactUs() {
  return (
    <div className="ecommerce-cms-wrapper">
      <Header />
      <div className="ecommerce-cms-main-content clearfix">
        <article className="ecommerce-cms-article">
          <article className="ecommerce-cms-article-inner">
            <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
              <div
                className="container"
                style={{ minHeight: 400 }}
              >
                <div className="row">
                  <div
                    className="col-md-6 col-lg-6 col-xs-12 col-sm-12"
                    style={{ marginBottom: 20, margin: '0 auto' }}
                  >
                    <img className="ecommerce-cms-about-logo img-fluid" src="https://s3.amazonaws.com/loystar/contact.jpg" alt="logo" />
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
};

export default ContactUs;
