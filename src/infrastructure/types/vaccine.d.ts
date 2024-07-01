import { UserReturnType } from "./userType";
import { PetReturnType } from "../../domain/entities/pet";

export type VaccineReturnType = {
    id: number;
    vaccineName: string;
    manufacturer: string;
    batch: string;
    applicationDate: Date;
    petId: number;
    vetId: number;
    pet: PetReturnType;
    user: UserReturnType;
};