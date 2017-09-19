import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema } from '../../shared/schemas.js';

export default new SimpleSchema([
  BaseSchema,
  {
    name: {
      type: String,
      label: 'Product Name',
    },
    productCategoryId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      label: 'Product Category',
    },
    pictures: {
      type: [String],
      label: 'Pictures',
      minCount: 1,
    },
    shortDescription: {
      type: String,
      label: 'Short Description (80 Chars Maximum)',
      max: 80,
    },
    description: {
      type: String,
      label: 'Product Description',
    },
    price: {
      type: Number,
      label: 'Price',
      decimal: true,
    },
    discount: {
      type: Number,
      label: 'Discount',
      decimal: true,
      optional: true,
    },
  },
]);
