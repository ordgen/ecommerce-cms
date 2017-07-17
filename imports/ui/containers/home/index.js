import React, { Component } from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Header from './Header';
import { Products } from '../../site-config';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="ecommerce-cms-wrapper">
        <Header />
        <div className="ecommerce-cms-main-content clearfix">
          <article className="ecommerce-cms-article">
            <article className="ecommerce-cms-article-inner">
              <section className="ecommerce-cms-landing-row ecommerce-cms-background ecommerce-cms-background-grey">
                <div className="container">
                  <div className="row">
                    {Products.map(product => (
                      <div
                        className="col-md-4 col-lg-4 col-xs-12 col-sm-6"
                        key={product.id}
                      >
                        <Card
                          style={{ marginBottom: 30 }}
                        >
                          <CardMedia>
                            <img src={product.image} alt="" />
                          </CardMedia>
                          <CardTitle title={product.category} subtitle={product.name} />
                          <CardText>
                            {product.description}
                          </CardText>
                          <CardActions>
                            <FlatButton label="View" />
                          </CardActions>
                        </Card>
                      </div>
                    ))
                    }
                  </div>
                </div>
              </section>
            </article>
          </article>
        </div>
        <footer className="ecommerce-cms-footer-linkboxes nocontent ecommerce-cms-footer-linkboxes-all-backup">
          <nav className="ecommerce-cms-full-site-width">
            <ul className="ecommerce-cms-footer-linkboxes-list">
              <li className="ecommerce-cms-footer-linkbox ecommerce-cms-footer-linkbox-backup">
                <h3 className="ecommerce-cms-footer-linkbox-heading">Connect</h3>
                <ul className="ecommerce-cms-footer-linkbox-list">
                  <li className="ecommerce-cms-footer-linkbox-item">
                    <a href="//googledevelopers.blogspot.com">
                      Blog
                    </a>
                  </li>
                  <li className="ecommerce-cms-footer-linkbox-item">
                    <a href="//www.facebook.com/Google-Developers-967415219957038/">
                      Facebook
                    </a>
                  </li>
                </ul>
              </li>
              <li className="ecommerce-cms-footer-linkbox ecommerce-cms-footer-linkbox-backup">
                <h3 className="ecommerce-cms-footer-linkbox-heading">Links</h3>
                <ul className="ecommerce-cms-footer-linkbox-list">
                  <li className="ecommerce-cms-footer-linkbox-item">
                    <a href="//googledevelopers.blogspot.com">
                      About
                    </a>
                  </li>
                  <li className="ecommerce-cms-footer-linkbox-item">
                    <a href="//www.facebook.com/Google-Developers-967415219957038/">
                      Contact Us
                    </a>
                  </li>
                  <li className="ecommerce-cms-footer-linkbox-item">
                    <a href="//www.facebook.com/Google-Developers-967415219957038/">
                      Products
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </footer>
        <footer className="ecommerce-cms-utility-utility-footer">
          <nav className="ecommerce-cms-utility-footer-nav ecommerce-cms-nav ecommerce-cms-full-site-width">
            <div className="ecommerce-cms-utility-footer-nav-left">
              <span className="ecommerce-cms-utility-footer-links">
                <a className="ecommerce-cms-utility-footer-link" href="https://www.ordgenlabs.com">
                  &copy; 2017 OrdgenLabs . All Rights Reserved
                </a>
              </span>
            </div>
          </nav>
        </footer>
      </div>
    );
  }
}

export default Home;
