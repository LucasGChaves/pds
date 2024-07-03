import { AddressReturnType } from "./address";
import { RoleReturnType } from "./roleType";

export type UserReturnType = {
    id: number;
    firstName: string;
    lastName: string;
    password?: string;
    email: string;
    phone: string;
    cpf: string;
    crmv?: string;
    photoFileName?: string;
    roleId: number;
    role: RoleReturnType;
    address: AddressReturnType;
}