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
        url: data.url,
        pageLink: data.pageLink,
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
              url: sliderImage.url,
              pageLink: sliderImage.pageLink,
            };
            dispatch(addSliderImage(payload));
          });
        }
      },
    );
  };
}

export function deleteSliderImage(id) {
  return dispatch => new Promise((resolve, reject) => {
    Meteor.call('SliderImages.methods.deleteImage',
      { imageId: id },
      (err, res) => {
        if (!err) {
          dispatch(removeSliderImage({ id }));
          resolve(res);
        } else {
          reject(err);
        }
      },
    );
  });
}
