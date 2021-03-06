import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const BaseSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      }
      return undefined;
    },
  },

  updatedAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isUpdate) {
        return new Date();
      }
      return undefined;
    },
  },
});

export const OwnerSchema = new SimpleSchema({
  createdBy: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
});


export const LoginFormSchema = new SimpleSchema({
  email: {
    type: String,
    label: 'Email',
  },
  password: {
    type: String,
    label: 'Password',
  },
});
