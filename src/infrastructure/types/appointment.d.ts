import { UserReturnType } from "./userType";
import { PetReturnType } from "../../domain/entities/pet";

export type AppointmentReturnType = {
    id: number;
    appointmentDate: Date;
    appointmentTime: string;
    description: string;
    scheduled: boolean;
    petId: number;
    vetId: number;
    pet: PetReturnType;
    vet: UserReturnType;
    owner: UserReturnType;
};