import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import SliderImages from '../sliderImages';

export const createImage = new ValidatedMethod({
  name: 'SliderImages.methods.createImage',
  validate: new SimpleSchema({
    image: {
      type: String,
    },
    link: {
      type: String,
      optional: true,
    },
  }).validator(),

  async run(...args) {
    return SliderImages.insert(...args);
  },
});

export const getAllSliderImages = new ValidatedMethod({
  name: 'SliderImages.methods.getAllSliderImages',
  validate: null,

  async run() {
    return SliderImages.find({}).fetch();
  },
});
