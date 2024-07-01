import { Address } from "../../domain/entities/address";
import { AddressRepositoryInterface } from "../../domain/ports/addressRepositoryInterface";

export class AddressService {
    constructor(private addressRepository: AddressRepositoryInterface) {}

    async createAddress(address: Partial<Address>): Promise<Address> {
        return await this.addressRepository.createAddress(address);
    }

    async updateAddress(userId: number, updatedData: Partial<Address>): Promise <Address | undefined> {
        return await this.addressRepository.updateAddress(userId, updatedData);
    }

    async deleteAddress(userId: number): Promise<boolean | undefined> {
        return await this.addressRepository.deleteAddress(userId);
    }

    async findByUserId(userId: number): Promise<Address | undefined> {
        return await this.addressRepository.findByUserId(userId);
    }
}