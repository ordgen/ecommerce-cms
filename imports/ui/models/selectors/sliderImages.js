import { createSelector } from 'redux-orm';
import orm from '../orm';

const stateSelector = state => state.entities;

export const AllSliderImagesSelector = createSelector(
  orm,
  stateSelector,
  session => session.SliderImage.all().toRefArray(),
);
