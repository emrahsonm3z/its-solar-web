import dotenv from "dotenv";

dotenv.config();

export const APP_HTTP_URI =
  process.env.APP_HTTP_URI || "http://localhost:3008/graphql";
// export const APP_SUBSCRIPTION_URI =
//   process.env.APP_SUBSCRIPTION_URI || "ws://localhost:3008/";
export const APP_SUBSCRIPTION_URI = "ws://localhost:3008/graphql";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const isDev = process.env.NODE_ENV !== "production";
export const AUTH_TOKEN_KEY = process.env.AUTH_TOKEN_KEY || "token";
export const USER_INFO = process.env.USER_INFO || "userInfo";
export const LOCALE = process.env.LOCALE || "locale";
