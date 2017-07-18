import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { BaseSchema } from '../../shared/schemas.js';

const SiteConfig = new Mongo.Collection('siteConfig');

// Deny all client-side updates
SiteConfig.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

SiteConfig.schema = new SimpleSchema([
  BaseSchema,
  {
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    siteName: {
      type: String,
      label: 'Site Name',
      defaultValue: 'Ordgen',
    },
    SiteLogo: {
      type: String,
      label: 'Site Logo',
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
    },
    'socialMedia.facebook': {
      type: Object,
      optional: true,
    },
    'socialMedia.facebook.url': {
      type: String,
      optional: true,
      defaultValue: '',
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
    },
    'socialMedia.facebook.title': {
      type: String,
      optional: true,
      defaultValue: 'Facebook',
    },
    'socialMedia.twitter': {
      type: Object,
      optional: true,
    },
    'socialMedia.twitter.url': {
      type: String,
      optional: true,
      defaultValue: '',
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
    },
    'socialMedia.youtube.url': {
      type: String,
      optional: true,
      defaultValue: '',
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
    },
    'socialMedia.youtube.title': {
      type: String,
      optional: true,
      defaultValue: 'Youtube',
    },
  },
]);

SiteConfig.attachSchema(SiteConfig.schema);

export default SiteConfig;

