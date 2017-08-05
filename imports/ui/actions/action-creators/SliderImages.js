import { Meteor } from 'meteor/meteor';
import {
  ADD_SLIDER_IMAGE,
  REMOVE_SLIDER_IMAGE,
  UPDATE_SLIDER_IMAGE,
  IS_LOADING_SLIDER_IMAGES,
} from '../types';

import setIsLoadingState from './IsLoading';

export function addSliderImage(payload) {
  return {
    type: ADD_SLIDER_IMAGE,
    payload,
  };
}

export function removeSliderImage(payload) {
  return {
    type: REMOVE_SLIDER_IMAGE,
    payload,
  };
}

export function updateSliderImage(payload) {
  return {
    type: UPDATE_SLIDER_IMAGE,
    payload,
  };
}

export function createSliderImage(data) {
  return dispatch => new Promise((resolve, reject) => {
    Meteor.call('SliderImages.methods.createImage',
      {
        image: data.image,
        link: data.link,
      },
      (err, res) => {
        if (!err) {
          const payload = {
            ...data,
            id: res,
          };
          dispatch(addSliderImage(payload));
          resolve(res);
        } else {
          reject(err);
        }
      },
    );
  });
}

export function fetchAndCreateSliderImages() {
  return (dispatch) => {
    dispatch(setIsLoadingState(IS_LOADING_SLIDER_IMAGES, true));
    return Meteor.call('SliderImages.methods.getAllSliderImages',
      (err, res) => {
        dispatch(setIsLoadingState(IS_LOADING_SLIDER_IMAGES, false));
        if (!err) {
          res.forEach((sliderImage) => {
            const payload = {
              id: sliderImage._id, // eslint-disable-line no-underscore-dangle
              image: sliderImage.image,
              link: sliderImage.link,
            };
            dispatch(addSliderImage(payload));
          });
        }
      },
    );
  };
}
