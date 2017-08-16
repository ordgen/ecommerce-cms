import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import './BreadCrumbs.css';

const getLink = (page, url) => url.substr(0, url.indexOf(page));

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

export default function BreadCrumbs({ match, pageTitle }) {
  const url = match.url;
  const pages = _.compact(url.match(/[^/]*/mg));
  return (
    <div className="breadcrumbs-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
            <h5 className="breadcrumbs-title">{pageTitle}</h5>
            <ol className="breadcrumbs">
              {pages.map(
                (page, index) => {
                  if (page === 'dashboard') {
                    return (
                      <li key={index}>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                    );
                  }
                  return (
                    <li key={index}>
                      <Link to={`${getLink(page, url)}${page}`}>{capitalizeFirstLetter(page)}</Link>
                    </li>
                  );
                })
              }
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

BreadCrumbs.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};
