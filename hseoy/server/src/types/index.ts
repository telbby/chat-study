export interface CreatedUserInfo {
  uid?: string;
  userId?: string;
  loggedInAt: Date;
  createdAt: Date;
  permission: 'GUEST' | 'ADMIN';
}

export interface AdminUserLoginInfo {
  userId: string;
  password: string;
}

export interface GuestUserLoginInfo {
  uid: string;
}

export type UserInfo = AdminUserLoginInfo;

export type AdminLoginRequestBody = AdminUserLoginInfo;
export type GuestLoginRequestBody = GuestUserLoginInfo;
export type CreateUserRequestBody = AdminUserLoginInfo;
