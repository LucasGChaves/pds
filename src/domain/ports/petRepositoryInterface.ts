import { Pet } from "../entities/pet";

export interface PetRepositoryInterface {
  createPet(pet: Partial<Pet>): Promise<Pet>;
  updatePet(petId: number, updatedData: Partial<Pet>): Promise<Pet | undefined>;
  deletePet(petId: number): Promise<boolean | undefined>;
  findById(petId: number): Promise<Pet | undefined>;
  findAllSpecifiedByIds(petIds: number[]): Promise<Pet[] | undefined>;
  findByUserId(id: number): Promise<Pet | undefined>;
  findAllByUserId(id: number): Promise<Pet[] | undefined>;
}