import { IRole } from "./role";

export interface IUser {
  id: number;
  name: string;
  lastName: string;
  password: string;
  cpf: string;
  crmv: string;
  cnpj: string;
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
  cnpj: string;
  email: string;
  phone: string;
  photoFileName: string;
  roleId: IRole;
  availableTime: Date;
}
