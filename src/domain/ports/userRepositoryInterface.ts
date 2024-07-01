import {User} from "../entities/user";
import { Address } from "../entities/address";

export interface UserRepositoryInterface {
  createUser(user: Partial<User>): Promise<User>;
  updateUser(userId: number, updatedData: Partial<User>): Promise<User | undefined>;
  getUserAddress(userId: number): Promise<Address | undefined>;
  deleteUser(userId: number): Promise<boolean | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  findAllByRole(roleId: number): Promise<User[] | undefined>;
  findAllByRoleAndFilters(roleId: number, filters: any): Promise<User[] | undefined>;
}