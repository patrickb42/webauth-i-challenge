export interface UserCredentials {
  id?: number,
  username?: string,
  hashedPassword?: string,
}

export interface UnknownShape {
  [key: string]: any,
}
