import { IPet } from "./pet";
import { IUserGet } from "./user";

export interface IVaccine {
  id: number;
  vaccineName: string;
  manufacturer: string;
  applicationDate: Date;
  batch: string;
  pet: IPet;
  vet: IUserGet;
}

export interface IVaccineRegistrationFormData {
  vaccineName: string;
  manufacturer: string;
  batch: string;
  date: Date;
}
