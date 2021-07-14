import { createAuth } from '@keystone-next/auth';
import { config } from '@keystone-next/keystone/schema';
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session';

import { lists } from './schema';

import 'dotenv/config';

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'The SESSION_SECRET environment variable must be set in production'
    );
  } else {
    sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
  }
}

let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const auth = createAuth({
  listKey: 'User',
  identityField: 'username',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'username', 'email', 'password'],
  },
});

export default auth.withAuth(
  config({
    server: {
      cors: {
        // @ts-ignore
        origin: [process.env.FRONTEND_URL || 'http://localhost:7777'],
        credentials: true,
      },
    },
    db: {
      adapter: 'prisma_postgresql',
      url:
        process.env.DATABASE_URL || 'postgres://narsaynorath@localhost/journey',
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session: withItemData(
      statelessSessions({
        maxAge: sessionMaxAge,
        secret: sessionSecret,
      }),
      { User: 'name' }
    ),
  })
);
