import { relationship, text, timestamp } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Plan = list({
  fields: {
    title: text(),
    destination: text(), // TODO: Is there a standardized way to store City, Country data?
    tripStart: timestamp({
      isRequired: true,
    }), // TODO: I'm only interested in date
    tripEnd: timestamp({
      isRequired: true,
    }),
    user: relationship({ ref: 'User.plans' }),
  },
});
