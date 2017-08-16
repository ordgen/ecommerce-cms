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
      defaultValue: true,
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
      defaultValue: true,
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
      defaultValue: true,
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
      defaultValue: true,
      label: 'Show youtube button',
    },
    'socialMedia.youtube.title': {
      type: String,
      optional: true,
      defaultValue: 'Youtube',
    },
  },
]);
