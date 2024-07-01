import { Role } from "../entities/role";

export interface RoleRepositoryInterface {
    findById(id: number): Promise<Role | undefined>;
}