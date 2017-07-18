import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// eslint-disable-next-line prefer-arrow-callback
Meteor.publish(null, function () {
  if (Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
    return Roles.getUsersInRole('admin');
  }
  return this.stop();
});
