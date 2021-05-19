import { createSchema } from '@keystone-next/keystone/schema';

import { Plan } from './Plan';
import { User } from './User';

export const lists = createSchema({
  User,
  Plan,
});
