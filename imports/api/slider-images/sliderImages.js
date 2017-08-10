import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema } from '../../shared/schemas.js';

const SliderImages = new Mongo.Collection('sliderImages');

// Deny all client-side updates
SliderImages.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

SliderImages.schema = new SimpleSchema([
  BaseSchema,
  {
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    url: {
      type: String,
      label: 'Image (3376/560)',
    },
    pageLink: {
      type: String,
      optional: true,
      label: 'Page link (optional)',
    },
  },
]);

SliderImages.attachSchema(SliderImages.schema);

export default SliderImages;

