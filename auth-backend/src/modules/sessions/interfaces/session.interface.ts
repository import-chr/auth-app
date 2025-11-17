export interface CreateSessionInterface {
  id?: string;

  userId: string;
  refreshToken: string;

  userAgent?: string;
  ipAddress?: string;
  location?: string;
  isActive?: boolean;
  expiresAt?: string;
}

export interface UpdateSessionInterface {
  id: string;
  userId: string;

  refreshToken?: string;
  userAgent?: string;
  ipAddress?: string;
  location?: string;
  isActive?: boolean;
  expiresAt?: string;
}

export interface GetAllSessionsInterface {
  userId: string;
}

export interface GetSessionInterface {
  id: string;
  userId: string;
}

export interface IGetSessionByParamsInterface {
  userId: string;
  ip?: string;
  userAgent?: string;
}
