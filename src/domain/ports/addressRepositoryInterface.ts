import { Address } from "../entities/address";

export interface AddressRepositoryInterface {
  createAddress(pet: Partial<Address>): Promise<Address>;
  updateAddress(petId: number, updatedData: Partial<Address>): Promise<Address | undefined>;
  deleteAddress(petId: number): Promise<boolean | undefined>;
  findByUserId(userId: number): Promise<Address | undefined>;
}