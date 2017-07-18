import React from 'react';
import './SecondaryFooter.css';

export default function SecondaryFooter() {
  return (
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
  );
}
