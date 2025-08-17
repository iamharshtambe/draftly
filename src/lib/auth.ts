import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as schema from './schema';
import { db } from './index';

export const auth = betterAuth({
  appName: 'Draftly',
  secret: process.env.BETTER_AUTH_SECRET || '',
  baseURL: process.env.BASE_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 6 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
    disableSessionRefresh: true,
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    },
  },
});
