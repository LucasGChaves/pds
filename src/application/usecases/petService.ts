import { Pet } from "../../domain/entities/pet";
import { PetRepositoryInterface } from "../../domain/ports/petRepositoryInterface";

export class PetService {
  constructor(private petRepository: PetRepositoryInterface) {}

  async createPet(pet: Partial<Pet>, ownerId: number): Promise<Pet> {
    return await this.petRepository.createPet({...pet, ownerId: ownerId});
  }

  async updatePet(petId: number, updatedData: Partial<Pet>): Promise<Pet | undefined> {
    return await this.petRepository.updatePet(petId, updatedData);
  }

  async deletePet(petId: number): Promise <boolean | undefined> {
    return await this.petRepository.deletePet(petId);
  }

  async findById(petId: number): Promise <Pet | undefined> {
    return await this.petRepository.findById(petId);
  }
  
  async findAllSpecifiedByIds(petIds: number[]): Promise<Pet[] | undefined> {
    return await this.petRepository.findAllSpecifiedByIds(petIds);
  }

  async findByUserId(userId: number): Promise<Pet | undefined> {
    return await this.petRepository.findByUserId(userId);
  }

  async findAllByUserId(userId: number): Promise<Pet[] | undefined> {
    return await this.petRepository.findAllByUserId(userId);
  }
}
