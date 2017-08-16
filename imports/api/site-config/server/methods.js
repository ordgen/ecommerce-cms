import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import SiteConfig from '../site-config';

export const getSiteConfig = new ValidatedMethod({
  name: 'SiteConfig.methods.getSiteConfig',
  validate: null,

  async run() {
    return SiteConfig.findOne();
  },
});

export const updateSiteConfig = new ValidatedMethod({
  name: 'SiteConfig.methods.updateSiteConfig',
  validate: new SimpleSchema({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    siteName: {
      type: String,
      label: 'Site Name',
    },
    aboutUs: {
      type: String,
      label: 'About Company',
    },
    primaryLogo: {
      type: String,
    },
    secondaryLogo: {
      type: String,
    },
    currency: {
      type: String,
    },
    companyPhones: {
      type: [String],
    },
    companyEmails: {
      type: [String],
    },
    socialMedia: {
      type: Object,
      label: 'Social Media',
      optional: true,
    },
    'socialMedia.facebook': {
      type: Object,
      optional: true,
    },
    'socialMedia.facebook.url': {
      type: String,
      optional: true,
    },
    'socialMedia.facebook.icon': {
      type: String,
      optional: true,
    },
    'socialMedia.facebook.isEnabled': {
      type: Boolean,
      optional: true,
    },
    'socialMedia.facebook.title': {
      type: String,
      optional: true,
    },
    'socialMedia.twitter': {
      type: Object,
      optional: true,
    },
    'socialMedia.twitter.url': {
      type: String,
      optional: true,
    },
    'socialMedia.twitter.icon': {
      type: String,
      optional: true,
    },
    'socialMedia.twitter.isEnabled': {
      type: Boolean,
      optional: true,
    },
    'socialMedia.twitter.title': {
      type: String,
      optional: true,
    },
    'socialMedia.linkedin': {
      type: Object,
      optional: true,
    },
    'socialMedia.linkedin.url': {
      type: String,
      optional: true,
    },
    'socialMedia.linkedin.icon': {
      type: String,
      optional: true,
    },
    'socialMedia.linkedin.isEnabled': {
      type: Boolean,
      optional: true,
    },
    'socialMedia.linkedin.title': {
      type: String,
      optional: true,
    },
    'socialMedia.google': {
      type: Object,
      optional: true,
    },
    'socialMedia.google.url': {
      type: String,
      optional: true,
    },
    'socialMedia.google.icon': {
      type: String,
      optional: true,
    },
    'socialMedia.google.isEnabled': {
      type: Boolean,
      optional: true,
    },
    'socialMedia.google.title': {
      type: String,
      optional: true,
    },
    'socialMedia.youtube': {
      type: Object,
      optional: true,
      label: 'Youtube',
    },
    'socialMedia.youtube.url': {
      type: String,
      optional: true,
    },
    'socialMedia.youtube.icon': {
      type: String,
      optional: true,
    },
    'socialMedia.youtube.isEnabled': {
      type: Boolean,
      optional: true,
      defaultValue: true,
    },
    'socialMedia.youtube.title': {
      type: String,
      optional: true,
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
  }).validator(),

  async run({ _id, siteName, aboutUs, primaryLogo, secondaryLogo, currency, companyPhones, companyEmails, socialMedia }) { // eslint-disable-line
    const siteConfig = await new Promise(resolve =>
      SiteConfig.update(
        { _id },
        { $set: { siteName, aboutUs, primaryLogo, secondaryLogo, currency, companyPhones, companyEmails, socialMedia } }, // eslint-disable-line
        () => resolve(SiteConfig.findOne(_id)),
      ),
    );
    return siteConfig;
  },
});
