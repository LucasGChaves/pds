import { HttpError } from "../../../api/middlewares/errors";
import { Address } from "../../../domain/entities/address";
import { AddressModel } from "../orm/addressModel";
import { Pet } from "../../../domain/entities/pet";
import { PetRepositoryInterface } from "../../../domain/ports/petRepositoryInterface";
import { PetModel } from "../orm/petModel";

export class PetRepository implements PetRepositoryInterface {
  async createPet(pet: Partial<Pet>): Promise <Pet> {
    const createdPet = await PetModel.query().insert(pet);
    return new Pet(createdPet);
  }

  async updatePet(petId: number, updatedData: Partial<Pet>): Promise <Pet | undefined> {
    const updatedPet = await PetModel.query().patchAndFetchById(petId, updatedData);
    if(!updatedPet) {
      throw new HttpError("Pet não encontrado.", 500);
    }
    return updatedPet;
  }

  async deletePet(petId: number): Promise<boolean | undefined> {
    try {
      await PetModel.query().deleteById(petId);
      return true;
    } catch (err: any) {
      throw new HttpError(err.message || "Não foi possível deletar o pet solicitado", 500);
    }
  }

  async findById(id: number): Promise<Pet | undefined> {
    const pet = await PetModel.query().findById(id);
    return pet;
  }

  async findAllSpecifiedByIds(petIds: number[]): Promise<Pet[] | undefined> {
    const pets = await PetModel.query().findByIds(petIds);
    return pets;
  }

  async findByUserId(ownerId: number): Promise <Pet | undefined> {
    const pet = await PetModel.query().where("ownerId", ownerId).first();
    return pet;
  }

  async findAllByUserId(ownerId: number): Promise<Pet[] | undefined> {
    const pets = await PetModel.query().where("ownerId", ownerId);
    return pets;  
  }
}