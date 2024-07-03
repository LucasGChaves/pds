import { User } from "../../../domain/entities/user";
import { UserRepositoryInterface } from "../../../domain/ports/userRepositoryInterface";
import { UserModel } from "../orm/userModel";
import { HttpError } from "../../../api/middlewares/errors";
import { Address } from "../../../domain/entities/address";
import { AddressModel } from "../orm/addressModel";

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

  async getUserAddress(userId: number): Promise<Address | undefined> {
    const address = await AddressModel.query().where("userId", userId).first();
    if(!address) {
      throw new HttpError("Não foi possível encontrar um endereço associado a este usuário.", 400);
    }
    return address;
  }

  async deleteUser(userId: number): Promise<boolean | undefined> {
    try {
      console.log(userId);
      await UserModel.query().where("id", userId).del();
      return true;
    } catch (err: any) {
      throw new HttpError(JSON.stringify(err) || "Não foi possível deletar o usuário solicitado.", 500);
    }
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
    //const user = await UserModel.query().where("id", id).first();
    const user = await UserModel.query().findById(id);
    return user;
  }

  async findAllByRole(roleId: number): Promise<User[] | undefined> {
    const users = await UserModel.query().where("roleId", roleId);
    
    if(!users) {
      throw new HttpError("Nenhum usuário foi encontrado.", 404);
    }

    return users;
  }

  async findAllByRoleAndFilters(roleId: number, filters: any): Promise<User[] | undefined> {
    let users = null;
    if(filters.city && filters.district) {
      users = await UserModel.query().joinRelated("address")
      .where("user.roleId", roleId).
      andWhere("city", filters.city).
      andWhere("district", filters.district);
    }
    else if(filters.city) {
      users = await UserModel.query().joinRelated("address")
      .where("user.roleId", roleId).
      andWhere("city", filters.city);
    }
    else {
      users = await UserModel.query().joinRelated("address")
      .where("user.roleId", roleId).
      andWhere("district", filters.district);
    }

    if(!users) {
      throw new HttpError("Nenhum usuário foi encontrado.", 404);
    }

    return users;
  }
}