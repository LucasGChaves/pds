import { User } from "../../../domain/entities/user";
import { UserRepositoryInterface } from "../../../domain/ports/userRepositoryInterface";
import { UserModel } from "../orm/userModel";
import { HttpError } from "../../../api/middlewares/errors";

export class UserRepository implements UserRepositoryInterface {
  async createUser(user: Partial<User>): Promise <User> {
    const createdUser = await UserModel.query().insert(user);
    return new User(createdUser);
  }

  async updateUser(userId: number, updatedData: Partial<User>): Promise <User | undefined> {
    const updatedUser = await UserModel.query().patchAndFetchById(userId, updatedData);
    if(!updatedUser) {
      throw new HttpError("Usuário não encontrado.", 500);
    }
    return updatedUser;
  }

  async findByEmail(email: string): Promise <User | undefined> {
    const user = await UserModel.query().where("email", email).first();
    return user;
  }

  async findByCpf(cpf: string): Promise <User | undefined> {
    const user = await UserModel.query().where("cpf", cpf).first();
    return user;
  }

  async findById(id: number): Promise <User | undefined> {
    const user = await UserModel.query().where("id", id).first();
    return user;
  }
}