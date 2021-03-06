import { password, relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const User = list({
  ui: {
    listView: {
      initialColumns: ['name', 'email'],
    },
  },
  fields: {
    name: text(),
    username: text({ isRequired: true, isUnique: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password({ isRequired: true }),
    plans: relationship({ ref: 'Plan.user', many: true }),
  },
});
