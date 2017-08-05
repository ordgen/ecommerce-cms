import { Meteor } from 'meteor/meteor';
import SliderImages from '../sliderImages';

Meteor.publish('sliderImages', function () { // eslint-disable-line
  return SliderImages.find();
});
