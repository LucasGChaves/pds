import { Appointment } from "../entities/appointment";

export interface AppointmentRepositoryInterface {
    createAppointment(appointment: Partial<Appointment>): Promise<Appointment>;
    updateAppointment(id: number, updatedData: Partial<Appointment>): Promise<Appointment | undefined>;
    deleteAppointment(id: number): Promise<boolean | undefined>;
    findById(id: number): Promise<Appointment | undefined>;
    findAllByUserId(userId: number): Promise<Appointment[] | undefined>;
    findAllAvailableForOwnerByUserId(userId: number): Promise<Appointment[] | undefined>;
    findAllAvailableForOwnerByUserIdAndDate(userId: number, appointmentDate: string): Promise<Appointment[] | undefined>;
    findAllByPetId(petId: number): Promise<Appointment[] | undefined>;
  }