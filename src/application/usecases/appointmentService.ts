import { Appointment } from "../../domain/entities/appointment";
import { AppointmentRepositoryInterface } from "../../domain/ports/appointmentRepositoryInterface";
import { PetRepository } from "../../infrastructure/adapters/repository/petRepository";
import { PetService } from "./petService";
import { UserRepository } from "../../infrastructure/adapters/repository/userRepository";
import { UserService } from "./userService";
import { HttpError } from "../../api/middlewares/errors";
import { AppointmentReturnType } from "../../infrastructure/types/appointment";

const petRepository = new PetRepository();
const petService = new PetService(petRepository);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class AppointmentService {
    constructor(private appointmentRepository: AppointmentRepositoryInterface) {}

    async createAppointment(appointment: Partial<Appointment>): Promise<AppointmentReturnType> {
        const createdAppointment = await this.appointmentRepository.createAppointment(appointment);

        if(!createdAppointment) {
            throw new HttpError("Não foi possívle encontrar a consulta desejada.", 404);
        }

        const vet = await userService.findById(Number(createdAppointment.vetId));

        let appointmentCopy: any = {...createdAppointment, vet: vet};
        return appointmentCopy;
    }

    async updateAppointment(id: number, updatedData: Partial<Appointment>): Promise<AppointmentReturnType | undefined> {
        const updatedAppointment = await this.appointmentRepository.updateAppointment(id, updatedData);

        if(!updatedAppointment) {
            throw new HttpError("Não foi possívle encontrar a consulta desejada.", 404);
        }

        const pet = await petService.findById(Number(updatedAppointment.petId));
        const vet = await userService.findById(Number(updatedAppointment.vetId));

        let appointmentCopy: any = {...updatedAppointment, pet: pet, vet: vet};
        return appointmentCopy;
    }

    async deleteAppointment(id: number): Promise<boolean | undefined> {
        return await this.appointmentRepository.deleteAppointment(id);
    }

    async findById(id: number): Promise<AppointmentReturnType | undefined> {
        const appointment = await this.appointmentRepository.findById(id);

        if(!appointment) {
            throw new HttpError("Não foi possívle encontrar a consulta desejada.", 404);
        }

        const pet = await petService.findById(Number(appointment.petId));
        const vet = await userService.findById(Number(appointment.vetId));

        let appointmentCopy: any = {...appointment, pet: pet, vet: vet};
        return appointmentCopy;
    }

    async findAllByUserId(userId: number): Promise<AppointmentReturnType[] | undefined> {
        const appointments = await this.appointmentRepository.findAllByUserId(userId);

        if(!appointments) {
            throw new HttpError("Não foi possívle encontrar nenhuma consulta.", 404);
        }

        const appointmentsCopy = Promise.all(appointments.map(async appointment => {
            let pet = await petService.findById(Number(appointment.petId));
            let vet = await userService.findById(Number(appointment.vetId));

            let appointmentCopy: any = {...appointment, pet: pet, vet: vet};
            return appointmentCopy;
        }));

        return appointmentsCopy;
    }

    async findAllByPetId(petId: number): Promise<AppointmentReturnType[] | undefined> {
        const appointments = await this.appointmentRepository.findAllByPetId(petId);

        if(!appointments) {
            throw new HttpError("Não foi possívle encontrar nenhuma consulta.", 404);
        }

        const appointmentsCopy = Promise.all(appointments.map(async appointment => {
            let pet = await petService.findById(Number(appointment.petId));
            let vet = await userService.findById(Number(appointment.vetId));

            let appointmentCopy: any = {...appointment, pet: pet, vet: vet};
            return appointmentCopy;
        }));

        return appointmentsCopy;
    }

    async findAllAvailableForOwnerByUserId(userId: number): Promise<AppointmentReturnType[] | undefined> {
        const appointments = await this.appointmentRepository.findAllAvailableForOwnerByUserId(userId);

        if(!appointments) {
            throw new HttpError("Não foi possívle encontrar nenhuma consulta.", 404);
        }

        const appointmentsCopy = Promise.all(appointments.map(async appointment => {
            let pet = await petService.findById(Number(appointment.petId));
            let vet = await userService.findById(Number(appointment.vetId));

            let appointmentCopy: any = {...appointment, pet: pet, vet: vet};
            return appointmentCopy;
        }));

        return appointmentsCopy;
    }

    async findAllAvailableForOwnerByUserIdAndDate(userId: number, appointmentDate: Date): Promise <AppointmentReturnType[] | undefined> {
        const appointments = await this.appointmentRepository.findAllAvailableForOwnerByUserIdAndDate(userId, appointmentDate);

        if(!appointments) {
            throw new HttpError("Não foi possívle encontrar nenhuma consulta.", 404);
        }

        const appointmentsCopy = Promise.all(appointments.map(async appointment => {
            let pet = await petService.findById(Number(appointment.petId));
            let vet = await userService.findById(Number(appointment.vetId));

            let appointmentCopy: any = {...appointment, pet: pet, vet: vet};
            return appointmentCopy;
        }));

        return appointmentsCopy;
    }
}
