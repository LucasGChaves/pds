import { UserReturnType } from "./userType";

export type PetReturnType = {
    id: number
    name: string
    birthDate: Date
    species: string
    breed?: string
    photoFileName?: string;
    ownerId: number;
    owner: UserReturnType;
};