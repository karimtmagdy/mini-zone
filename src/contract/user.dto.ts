import type { At, Image } from "./global.dto";

export const USER_STATE = ["online", "offline"] as const;
export type UserState = (typeof USER_STATE)[number];
export enum UserStateEnum {
  ONLINE = "online",
  OFFLINE = "offline",
}
export const USER_GENDERS = ["male", "female"] as const;
export type UserGender = (typeof USER_GENDERS)[number];
export enum UserGenderEnum {
  MALE = "male",
  FEMALE = "female",
}
export const USER_ACCOUNT_STATUS = [
  "active",
  "inactive",
  "suspended",
  "banned",
  "pending",
  "verified",
  "archived",
  "deactivated",
  "locked",
] as const;
export type UserAccountStatus = (typeof USER_ACCOUNT_STATUS)[number];

export enum UserAccountStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  BANNED = "banned",
  PENDING = "pending",
  VERIFIED = "verified",
  ARCHIVED = "archived",
  DEACTIVATED = "deactivated",
  LOCKED = "locked",
}
export const USER_ROLES = [
  "admin",
  "user",
  // "guest",
  // "editor",
  // "moderator",
  // "contributor",
  // "subscriber",
  // "owner",
  // "manager",
  // "viewer",
  // "seller",
  // "delivery-boy",
  // "super-admin",
  // "staff",
  // "customer-support",
  "vendor",
] as const;
export enum UserRoleEnum {
  ADMIN = "admin",
  USER = "user",
  // GUEST = "guest",
  // EDITOR = "editor",
  // MODERATOR = "moderator",
  // CONTRIBUTOR = "contributor",
  // SUBSCRIBER = "subscriber",
  // OWNER = "owner",
  // MANAGER = "manager",
  // VIEWER = "viewer",
  // VERIFIED = "verified",
  // DEACTIVATED = "deactivated",
  // LOCKED = "locked",
}
export type UserRole = (typeof USER_ROLES)[number];

export type UserDto = At & {
  id: string;
  username: string;
  slug?: string;
  email: string;
  password: string;
  name?: {
    first: string;
    last: string;
  };
  age?: number;
  gender?: UserGender;
  image?: Image;
  role: UserRole;
  status: UserAccountStatus;
  state: UserState;
  //   verified?: boolean;
  //   verifiedAt?: Date;
  //   remember?: boolean;
  activeAt?: Date;
  logoutAt?: Date;
  lockedUntil?: Date;
  failedLoginAttempts?: number;
  //   cart?: {
  //     type?: string;
  //     productId: any;
  //   }[];
  //   wishlist?: any[];
};
