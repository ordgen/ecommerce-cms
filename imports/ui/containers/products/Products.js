import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import './Products.css';

const style = {
  margin: 12,
};

export default class Products extends Component {
  render() {
    return (
      <div>
        <BreadCrumbs match={this.props.match} pageTitle="Products" />
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="action-buttons">
                <ul>
                  <li>
                    <RaisedButton
                      label="Add New Product"
                      primary={true}
                      style={style}
                      containerElement={<Link to="/dashboard/products/new" />}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <div className="page-content">
                <h5>All Products</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Products.propTypes = {
  match: PropTypes.object.isRequired,
};
