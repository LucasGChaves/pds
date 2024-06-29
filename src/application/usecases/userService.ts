import { User } from "../../domain/entities/user";
import { UserRepositoryInterface } from "../../domain/ports/userRepositoryInterface";
import bcrypt from "bcrypt";

export class UserService {
    constructor(private userRepository: UserRepositoryInterface) {}

    async createUser(user: Partial<User>): Promise<User> {
      const hashedPassword = await bcrypt.hash(user.password!, 10);
      user.password = hashedPassword;
      return this.userRepository.createUser(user);
    }
    
    async updateUser(userId: number, updatedData: Partial<User>): Promise<User | undefined> {
      if(updatedData.password) {
        const hashedPassword = await bcrypt.hash(updatedData.password, 10);
        updatedData.password = hashedPassword;
      }
      return this.userRepository.updateUser(userId, updatedData);
    }

    async findByEmail(email: string): Promise<User | undefined> {
      return this.userRepository.findByEmail(email);
    }
  
    async findByCpf(cpf: string): Promise<User | undefined> {
      return this.userRepository.findByCpf(cpf);
    }

    async findById(id: number): Promise<User | undefined> {
      return this.userRepository.findById(id);
    }
}
