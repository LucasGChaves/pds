import { UserReturnType } from "./userType";
import { PetReturnType } from "../../domain/entities/pet";
import { ExamRequestReturnType } from "./examRequest";

export type AppointmentReturnType = {
    id: number;
    appointmentDate: Date;
    appointmentTime: string;
    description?: string;
    scheduled: boolean;
    petId?: number | null;
    vetId: number;
    pet?: PetReturnType;
    vet: UserReturnType;
    examRequest?: ExamRequestReturnType;
};