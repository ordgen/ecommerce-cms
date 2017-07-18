import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

export const createUser = new ValidatedMethod({
  name: 'Meteor.users.methods.createUser',
  validate: new SimpleSchema({
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  }).validator(),

  async run({ email, password, role }) {
    const id = Accounts.createUser({ email, password });
    if (role === 'admin') {
      return Roles.addUsersToRoles(id, [role], Roles.GLOBAL_GROUP);
    }

    return Roles.addUsersToRoles(id, [role]);
  },
});
