import { createSelector } from 'redux-orm';
import orm from '../orm';

const stateSelector = state => state.entities;

export const AllSliderImagesSelector = createSelector(
  orm,
  stateSelector,
  session => session.SliderImage.all().toRefArray().reverse(),
);

export const SliderImageSelector = createSelector(
  orm,
  stateSelector,
  (state, imageId) => imageId,
  (session, imageId) => {
    if (session.SliderImage.hasId(imageId)) {
      return session.SliderImage.withId(imageId).ref;
    }
    return null;
  },
);
