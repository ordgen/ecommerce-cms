import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { lime900, lime800 } from 'material-ui/styles/colors';
import './PrimaryFooter.css';

const links = [
  {
    name: 'About Us',
    url: '/about-us',
  },
  {
    name: 'Contact Us',
    url: '/contact-us',
  },
];

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

const renderSocialMediaLinks = (mediaObject) => {
  const mediaTypes = [];
  Object.keys(mediaObject).map((key) => {
    const mediaType = mediaObject[key];
    if (mediaType.isEnabled) {
      mediaTypes.push(mediaType);
    }
    return null;
  });
  return mediaTypes.map((mediaType, index) => (
    <li
      className="ecommerce-cms-footer-linkbox-item"
      key={index}
    >
      <a
        href={mediaType.url ? mediaType.url : '#'}
      >
        {mediaType.title}
      </a>
    </li>
  ));
};

export default class PrimaryFooter extends Component {
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
      <footer
        className="ecommerce-cms-footer-linkboxes nocontent ecommerce-cms-footer-linkboxes-all-backup"
        style={{ background: `linear-gradient(90deg,${lime900} 50%,${lime800} 50%)` }}
      >
        <nav className="ecommerce-cms-full-site-width">
          {siteConfig &&
            <ul className="ecommerce-cms-footer-linkboxes-list">
              <li
                className="ecommerce-cms-footer-linkbox ecommerce-cms-footer-linkbox-backup"
                style={{ background: lime900 }}
              >
                <h3 className="ecommerce-cms-footer-linkbox-heading">Connect</h3>
                <ul className="ecommerce-cms-footer-linkbox-list">
                  {renderSocialMediaLinks(siteConfig.socialMedia)}
                </ul>
              </li>
              <li
                className="ecommerce-cms-footer-linkbox ecommerce-cms-footer-linkbox-backup"
                style={{ background: lime900 }}
              >
                <h3 className="ecommerce-cms-footer-linkbox-heading">Links</h3>
                <ul className="ecommerce-cms-footer-linkbox-list">
                  {links.map((link, ind) => (
                    <li
                      className="ecommerce-cms-footer-linkbox-item"
                      key={ind}
                    >
                      <a href={link.url}>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          }
        </nav>
      </footer>
    );
  }
}
