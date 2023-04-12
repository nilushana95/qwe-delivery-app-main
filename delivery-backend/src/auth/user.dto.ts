export interface LoginData {
  userName: string;
  password: string;
}
export enum RoleTypes {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}
export class CreateUserDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly userName: string;
  readonly role: RoleTypes;
  password?: string;
  _id?: string;
}
