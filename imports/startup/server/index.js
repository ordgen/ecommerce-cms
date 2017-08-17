import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import SiteConfig from '../../api/site-config/site-config.js';
import AdminConfig from '../../shared/admin-config.js';
import ProductCategories from '../../api/product-categories/product-categories';
/*
  This defines all the collections, publications and methods that the application provides
  as an API to the client.
*/
import './register-api.js';
import './security.js';

ProductCategories._ensureIndex({ name: 1 }); // eslint-disable-line

// user roles
const roles = ['default', 'admin'];

Meteor.startup(() => {
  if (!SiteConfig.findOne()) {
    SiteConfig.insert({});
  }
  if (Meteor.roles.find().count() === 0) {
    roles.map(role => Roles.createRole(role));
  }
  if (Meteor.users.find().count() === 0) {
    Meteor.call('Meteor.users.methods.createUser',
      {
        email: AdminConfig.email,
        password: AdminConfig.password,
        role: 'admin',
      },
    );
  }
});
