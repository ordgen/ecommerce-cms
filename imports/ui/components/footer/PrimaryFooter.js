import React from 'react';
import { lime900, lime800 } from 'material-ui/styles/colors';
import './PrimaryFooter.css';

const linkboxes = [
  {
    title: 'Connect',
    links: [
      {
        name: 'Instagram',
        url: '#',
      },
      {
        name: 'Facebook',
        url: '#',
      },
    ],
  },
  {
    title: 'Links',
    links: [
      {
        name: 'About Us',
        url: '/about-us',
      },
      {
        name: 'Contact Us',
        url: '/contact-us',
      },
    ],
  },
];

export default function PrimaryFooter() {
  return (
    <footer
      className="ecommerce-cms-footer-linkboxes nocontent ecommerce-cms-footer-linkboxes-all-backup"
      style={{ background: `linear-gradient(90deg,${lime900} 50%,${lime800} 50%)` }}
    >
      <nav className="ecommerce-cms-full-site-width">
        <ul className="ecommerce-cms-footer-linkboxes-list">
          {linkboxes.map((linkbox, index) => (
            <li
              className="ecommerce-cms-footer-linkbox ecommerce-cms-footer-linkbox-backup"
              key={index}
              style={{ background: lime900 }}
            >
              <h3 className="ecommerce-cms-footer-linkbox-heading">{linkbox.title}</h3>
              <ul className="ecommerce-cms-footer-linkbox-list">
                {linkbox.links.map((link, ind) => (
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
          ))}
        </ul>
      </nav>
    </footer>
  );
}
