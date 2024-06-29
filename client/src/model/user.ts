import { IRole } from "./role";

export interface IAddress {
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
}
export interface IUser {
  id: number;
  name: string;
  lastName: string;
  password: string;
  cpf: string;
  crmv: string;
  address: IAddress;
  email: string;
  phone: string;
  photoFileName: string;
  roleId: number;
  availableTime: Date;
}

export interface IUserGet {
  id: number;
  name: string;
  lastName: string;
  cpf: string;
  crmv: string;
  email: string;
  phone: string;
  photoFileName: string;
  role: IRole;
  availableTime: Date;
  address: IAddress;
}
