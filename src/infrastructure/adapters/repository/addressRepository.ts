import { AddressRepositoryInterface } from "../../../domain/ports/addressRepositoryInterface";
import { AddressModel } from "../orm/addressModel";
import { Address } from "../../../domain/entities/address";
import { HttpError } from "../../../api/middlewares/errors";

export class AddressRepository implements AddressRepositoryInterface {
  async createAddress(address: Partial<Address>): Promise<Address> {
    const createdAddress = await AddressModel.query().insert(address);
    return new Address(createdAddress);
  }

  async updateAddress(userId: number, updatedData: Partial<Address>): Promise<Address | undefined> {
    const updatedAddress = await AddressModel.query().where("userId", userId).patchAndFetch(updatedData);
    if(!updatedAddress) {
        throw new HttpError("Endereço não encontrado.", 500);
    }
    return updatedAddress;
  }

  async deleteAddress(userId: number): Promise<boolean | undefined> {
    try {
        await AddressModel.query().where("userId", userId).del();
        return true;
      } catch (err: any) {
        throw new HttpError(err.message || "Não foi possível deletar o endereço solicitado", 500);
      }
  }

  async findByUserId(userId: number): Promise<Address | undefined> {
    const address = await AddressModel.query().where("userId", userId).first();
    return address;
  }
}