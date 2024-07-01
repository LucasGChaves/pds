import { UserReturnType } from "./userType";
import { PetReturnType } from "../../domain/entities/pet";
import { AppointmentReturnType } from "./appointment";

export type ExamRequestReturnType = {
    id: number;
    vetSignature: string;
    result?: string;
    resultFile?: string;
    petId: number;
    vetId: number;
    appointmentId: number;
    pet: PetReturnType;
    vet: UserReturnType;
};