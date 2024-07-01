import { Appointment } from "../../domain/entities/appointment";
import { AppointmentRepositoryInterface } from "../../domain/ports/appointmentRepositoryInterface";
import { HttpError } from "../../api/middlewares/errors";

export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepositoryInterface) {}

    async createAppointment(appointmentData: Partial<Appointment>): Promise<Appointment> {
        const createdAppointment = await this.appointmentRepository.createAppointment(appointmentData);

        if(!createdAppointment) {
            throw new HttpError("Não foi possível encontrar a consulta desejada.", 404);
        }

        return createdAppointment;
    }

    async updateAppointment(id: number, updatedData: Partial<Appointment>): Promise<Appointment | undefined> {
        const updatedAppointment = await this.appointmentRepository.updateAppointment(id, updatedData);

        if(!updatedAppointment) {
            throw new HttpError("Não foi possível encontrar a consulta desejada.", 404);
        }

        return updatedAppointment;
    }

    async deleteAppointment(id: number): Promise<boolean | undefined> {
        return await this.appointmentRepository.deleteAppointment(id);
    }

    async findById(id: number): Promise<Appointment | undefined> {
        const appointment = await this.appointmentRepository.findById(id);

        if(!appointment) {
            throw new HttpError("Não foi possível encontrar a consulta desejada.", 404);
        }

        return appointment;
    }
}
