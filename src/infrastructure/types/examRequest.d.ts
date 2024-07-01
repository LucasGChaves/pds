import { UserReturnType } from "./userType";
import { PetReturnType } from "../../domain/entities/pet";

export type ExamRequestReturnType = {
    id: number;
    vetSignature: string;
    result: string;
    resultFile: string;
    petId: number;
    vetId: number;
    pet: PetReturnType;
    user: UserReturnType;
};