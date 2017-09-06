import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema } from '../../shared/schemas.js';

export default new SimpleSchema([
  BaseSchema,
  {
    name: {
      type: String,
      label: 'Name of Category',
    },
    description: {
      type: String,
      label: 'Description',
    },
    picture: {
      type: String,
      label: 'Cover Picture',
    },
    parent: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      optional: true,
      label: 'Parent of this category (optional)',
    },
  },
]);
