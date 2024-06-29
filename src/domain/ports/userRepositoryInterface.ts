import {User} from "../entities/user";

export interface UserRepositoryInterface {
  createUser(user: Partial<User>): Promise<User>;
  updateUser(userId: number, updatedData: Partial<User>): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
}