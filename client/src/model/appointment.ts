import { IPet } from "./pet";
import { IUserGet } from "./user";

export interface IAppointment {
  id: number;
  appointmentDate: Date;
  pet: IPet;
  vet: IUserGet;
  description?: string;
  examRequest: string;
}

export interface IAppointmentDetailsFormData {
  id?: string;
  description: string;
  petId?: number;
}

export interface INewAppointmentTimeFormData {
  date: Date;
  time: string;
}

export interface ScheduleAppointmentFormData {
  date: string;
  time: string;
  petId: string;
}
