import { UserReturnType } from "./userType";

export type AddressReturnType = {
    state: number;
    city: string;
    district: string;
    street: string;
    number: number;
    userId: number;
    user: UserReturnType;
};