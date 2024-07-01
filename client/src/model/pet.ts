import { IUserGet } from "./user";

export interface IPet {
  id: number;
  name: string;
  owner: IUserGet;
  birthDate: Date;
  species: string;
  breed: string;
  photo: string;
  age: number;
}

export interface IPetRegistrationFormData {
  id?: string;
  name: string;
  species: string;
  breed: string;
  birthDate: Date;
  photo?: string;
}
