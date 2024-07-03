import { Appointment } from "../../../domain/entities/appointment";
import { AppointmentRepositoryInterface } from "../../../domain/ports/appointmentRepositoryInterface";
import { AppointmentModel } from "../orm/appointmentModel";
import { HttpError } from "../../../api/middlewares/errors";

export class AppointmentRepository implements AppointmentRepositoryInterface {
    async createAppointment(appointment: Partial<Appointment>): Promise<Appointment> {
        const createdAppointment = await AppointmentModel.query().insert(appointment);
        return createdAppointment;
    }

    async updateAppointment(id: number, updatedData: Partial<Appointment>): Promise<Appointment | undefined> {
        let updatedAppointment = null;

        if(updatedData && !updatedData.petId) {
            delete updatedData.petId;
            updatedAppointment = await AppointmentModel.query().patchAndFetchById(id, {...updatedData, petId: null});
        }
        else {
            updatedAppointment = await AppointmentModel.query().patchAndFetchById(id, updatedData);
        }

        if(!updatedAppointment) {
            throw new HttpError("Consulta não encontrada.", 500);
        }
        return updatedAppointment;
    }

    async deleteAppointment(id: number): Promise<boolean | undefined> {
        try {
            await AppointmentModel.query().where("id", id).del();
            return true;
          } catch (err: any) {
            throw new HttpError(err.message || "Não foi possível deletar a consulta solicitada", 500);
        }
    }

    async findById(id: number): Promise<Appointment | undefined> {
        const appointment = await AppointmentModel.query().findById(id);
        if(!appointment) {
            throw new HttpError("Consulta não encontrada.", 500);
        }
        return appointment;
    }

    async findAllByUserId(userId: number): Promise<Appointment[] | undefined> {
        const appointments = await AppointmentModel.query().where("vetId", userId);
        if(!appointments || appointments && !appointments.length) {
            throw new HttpError("Consultas não encontradas.", 500);
        }
        return appointments;
    }

    async findAllByPetId(petId: number): Promise<Appointment[] | undefined> {
        const appointments = await AppointmentModel.query().where("petId", petId);
        if(!appointments || appointments && !appointments.length) {
            throw new HttpError("Consultas não encontradas.", 500);
        }
        return appointments;
    }

    async findAllAvailableForOwnerByUserId(userId: number): Promise<Appointment[] | undefined> {
        const appointments = await AppointmentModel.query()
        .where("vetId", userId)
        .andWhere("scheduled", false)
        .orderBy(["appointmentDate", "appointmentTime"]);

        if(!appointments || appointments && !appointments.length) {
            throw new HttpError("Consultas não encontradas.", 500);
        }

        return appointments;
    }

    async findAllAvailableForOwnerByUserIdAndDate(userId: number, appointmentDate: Date): Promise <Appointment[] | undefined> {
        const appointments = await AppointmentModel.query()
        .where("vetId", userId)
        .andWhere("scheduled", false)
        .andWhere("appointmentDate", appointmentDate)
        .orderBy(["appointmentDate", "appointmentTime"]);

        if(!appointments || appointments && !appointments.length) {
            throw new HttpError("Consultas não encontradas.", 500);
        }

        return appointments;
    }
}
