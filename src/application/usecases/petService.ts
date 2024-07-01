import { Pet } from "../../domain/entities/pet";
import { Vaccine } from "../../domain/entities/vaccine";
import { VaccineRepository } from "../../infrastructure/adapters/repository/vaccineRepository";
import { VaccineService } from "./vaccineService";
import { PetRepositoryInterface } from "../../domain/ports/petRepositoryInterface";

export class PetService {
  constructor(private petRepository: PetRepositoryInterface) {}

  async createPet(pet: Partial<Pet>): Promise<Pet> {
    return await this.petRepository.createPet(pet);
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

  async getPetVaccines(id: number): Promise<Vaccine[] | undefined> {
    const vaccineRepository = new VaccineRepository();
    const vaccineServices = new VaccineService(vaccineRepository);
    return await vaccineServices.findAllByPetId(id);
  }
}
