import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import SliderImages from '../sliderImages';

export const createImage = new ValidatedMethod({
  name: 'SliderImages.methods.createImage',
  validate: new SimpleSchema({
    url: {
      type: String,
    },
    pageLink: {
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

export const deleteImage = new ValidatedMethod({
  name: 'SliderImages.methods.deleteImage',
  validate: new SimpleSchema({
    imageId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
  }).validator(),

  async run({ imageId }) {
    return SliderImages.remove({ _id: imageId });
  },
});
