import { Meteor } from 'meteor/meteor';
import SiteConfig from '../site-config.js';

// eslint-disable-next-line prefer-arrow-callback
Meteor.publish('siteConfig', function () {
  return SiteConfig.find();
});
