import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema } from '../../shared/schemas.js';

export default new SimpleSchema([
  BaseSchema,
  {
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    siteName: {
      type: String,
      label: 'Site Name',
      defaultValue: 'WallVille Decor',
    },
    aboutUs: {
      type: String,
      label: 'About Company',
      defaultValue: "Welcome to Wallvilledecor, a contemporary interior decor company. Serving our customers unique and elegant decorative pieces sourced from all corners of the globe. We pride ourselves with giving our customers (wallvillers) a tailor made and yet affordable designs to suit their taste. Our buying teams circle the globe to bring you a wide choice of inspirational furniture, homewares and all interior accessories. Our easy-to-use website allows you to shop by style or department and search by colour, material, or product. The more you shop, the more we'll get to know you and can improve your shopping experience by handpicking products we think you may also like. This is evolution...This is unique styling... This is Wallvilledecor.", // eslint-disable-line
    },
    aboutUsLogo: {
      type: String,
      label: 'About Us Logo',
    },
    currency: {
      type: String,
      label: 'Currency',
      defaultValue: 'GH₵',
    },
    primaryLogo: {
      type: String,
      label: 'Primary Logo',
      defaultValue: 'https://s3.amazonaws.com/loystar/wallville-logo.jpeg',
    },
    secondaryLogo: {
      type: String,
      label: 'Secondary Logo',
      defaultValue: 'https://s3.amazonaws.com/loystar/wallville-logo.jpeg',
    },
    companyPhones: {
      type: [String],
      label: 'Company Phone Numbers',
      defaultValue: ['+233244056101'],
    },
    companyEmails: {
      type: [String],
      label: 'Company Emails',
      defaultValue: ['ordgenlabs@gmail.com'],
    },
    socialMedia: {
      type: Object,
      label: 'Social Media',
      optional: true,
    },
    'socialMedia.facebook': {
      type: Object,
      optional: true,
      label: 'Facebook',
    },
    'socialMedia.facebook.url': {
      type: String,
      optional: true,
      defaultValue: '',
      label: 'Facebook Link',
    },
    'socialMedia.facebook.icon': {
      type: String,
      optional: true,
      defaultValue: 'fa-facebook',
    },
    'socialMedia.facebook.isEnabled': {
      type: Boolean,
      optional: true,
      defaultValue: true,
      label: 'Show facebook button',
    },
    'socialMedia.facebook.title': {
      type: String,
      optional: true,
      defaultValue: 'Facebook',
    },
    'socialMedia.twitter': {
      type: Object,
      optional: true,
      label: 'Twitter',
    },
    'socialMedia.twitter.url': {
      type: String,
      optional: true,
      defaultValue: '',
      label: 'Twitter Link',
    },
    'socialMedia.twitter.icon': {
      type: String,
      optional: true,
      defaultValue: 'fa-twitter',
    },
    'socialMedia.twitter.isEnabled': {
      type: Boolean,
      optional: true,
      defaultValue: false,
      label: 'Show twitter button',
    },
    'socialMedia.twitter.title': {
      type: String,
      optional: true,
      defaultValue: 'Twitter',
    },
    'socialMedia.linkedin': {
      type: Object,
      optional: true,
    },
    'socialMedia.linkedin.url': {
      type: String,
      optional: true,
      defaultValue: '',
    },
    'socialMedia.linkedin.icon': {
      type: String,
      optional: true,
      defaultValue: 'fa-linkedin',
    },
    'socialMedia.linkedin.isEnabled': {
      type: Boolean,
      optional: true,
      defaultValue: false,
    },
    'socialMedia.linkedin.title': {
      type: String,
      optional: true,
      defaultValue: 'Linkedin',
    },
    'socialMedia.google': {
      type: Object,
      optional: true,
    },
    'socialMedia.google.url': {
      type: String,
      optional: true,
      defaultValue: '',
    },
    'socialMedia.google.icon': {
      type: String,
      optional: true,
      defaultValue: 'fa-google-plus',
    },
    'socialMedia.google.isEnabled': {
      type: Boolean,
      optional: true,
      defaultValue: false,
    },
    'socialMedia.google.title': {
      type: String,
      optional: true,
      defaultValue: 'Google+',
    },
    'socialMedia.youtube': {
      type: Object,
      optional: true,
      label: 'Youtube',
    },
    'socialMedia.youtube.url': {
      type: String,
      optional: true,
      defaultValue: '',
      label: 'Youtube Link',
    },
    'socialMedia.youtube.icon': {
      type: String,
      optional: true,
      defaultValue: 'fa-youtube',
    },
    'socialMedia.youtube.isEnabled': {
      type: Boolean,
      optional: true,
      defaultValue: false,
      label: 'Show youtube button',
    },
    'socialMedia.youtube.title': {
      type: String,
      optional: true,
      defaultValue: 'Youtube',
    },
    'socialMedia.instagram': {
      type: Object,
      optional: true,
      label: 'Instagram',
    },
    'socialMedia.instagram.url': {
      type: String,
      optional: true,
      defaultValue: '',
      label: 'Instagram Link',
    },
    'socialMedia.instagram.icon': {
      type: String,
      optional: true,
      defaultValue: 'fa-instagram ',
    },
    'socialMedia.instagram.isEnabled': {
      type: Boolean,
      optional: true,
      defaultValue: true,
      label: 'Show instagram button',
    },
    'socialMedia.instagram.title': {
      type: String,
      optional: true,
      defaultValue: 'Instagram',
    },
  },
]);
