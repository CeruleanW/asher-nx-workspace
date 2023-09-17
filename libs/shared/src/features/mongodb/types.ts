import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

export type UserByNextJSAuth = DefaultUser & {
  emailVerified?: any;
  createdAt: string;
  updatedAt: string;
};

