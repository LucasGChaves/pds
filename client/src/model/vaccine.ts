import { IPet } from "./pet";
import { IUserGet } from "./user";

export interface IVaccine {
  id: number;
  vaccineName: string;
  manufacturer: string;
  batch: string;
  pet: IPet;
  vet: IUserGet;
}
