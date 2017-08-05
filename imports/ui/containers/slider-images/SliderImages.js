import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import './SliderImages.css';

const style = {
  margin: 12,
};

export default function SliderImages({ match }) {
  return (
    <div>
      <BreadCrumbs match={match} pageTitle="Slider" />
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div className="action-buttons">
              <ul>
                <li>
                  <RaisedButton
                    label="Add New Image To Slider"
                    primary={true}
                    style={style}
                    containerElement={<Link to="/dashboard/slider-images/new" />}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div className="page-content">
              <h5>Slider</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SliderImages.propTypes = {
  match: PropTypes.object.isRequired,
};
