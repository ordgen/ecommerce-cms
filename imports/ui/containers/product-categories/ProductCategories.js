import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import './ProductCategories.css';

const style = {
  margin: 12,
};

export default function ProductCategories({ match }) {
  return (
    <div>
      <BreadCrumbs match={match} pageTitle="Product Categories" />
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div className="action-buttons">
              <ul>
                <li>
                  <RaisedButton
                    label="Add New Category"
                    primary={true}
                    style={style}
                    containerElement={<Link to="/dashboard/product-categories/new" />}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div className="page-content">
              <h5>All Categories</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductCategories.propTypes = {
  match: PropTypes.object.isRequired,
};
