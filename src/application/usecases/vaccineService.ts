import { Vaccine } from "../../domain/entities/vaccine";
import { VaccineRepositoryInterface } from "../../domain/ports/vaccineRepositoryInterface";
import { PetRepository } from "../../infrastructure/adapters/repository/petRepository";
import { PetService } from "./petService";
import { UserRepository } from "../../infrastructure/adapters/repository/userRepository";
import { UserService } from "./userService";
import { HttpError } from "../../api/middlewares/errors";
import { VaccineReturnType } from "../../infrastructure/types/vaccine";

const petRepository = new PetRepository();
const petService = new PetService(petRepository);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class VaccineService {
    constructor(private vaccineRepository: VaccineRepositoryInterface){}

    async createVaccine(vaccine: Partial<Vaccine>): Promise<VaccineReturnType> {
        const createdVaccine = await this.vaccineRepository.createVaccine(vaccine);

        if(!createdVaccine) {
            throw new HttpError("Não foi possívle encontrar a vacina desejada.", 404);
        }

        const pet = await petService.findById(Number(createdVaccine.petId));
        const vet = await userService.findById(Number(createdVaccine.vetId));

        let vaccineCopy: any = {...createdVaccine, pet: pet, vet: vet};
        return vaccineCopy;
    }

    async updateVaccine(petId: number, updatedData: Partial<Vaccine>): Promise<VaccineReturnType | undefined> {
        const updatedVaccine = await this.vaccineRepository.updateVaccine(petId, updatedData);

        if(!updatedVaccine) {
            throw new HttpError("Não foi possívle encontrar a vacina desejada.", 404);
        }

        const pet = await petService.findById(Number(updatedVaccine.petId));
        const vet = await userService.findById(Number(updatedVaccine.vetId));

        let vaccineCopy: any = {...updatedVaccine, pet: pet, vet: vet};
        return vaccineCopy;
    }

    async deleteVaccine(petId: number): Promise <boolean | undefined> {
        return await this.vaccineRepository.deleteVaccine(petId);
      }
  
    async findById(id: number): Promise<Vaccine | undefined> {
        const vaccine = await this.vaccineRepository.findById(id);

        if(!vaccine) {
            throw new HttpError("Não foi possívle encontrar a vacina desejada.", 404);
        }

        const pet = await petService.findById(Number(vaccine.petId));
        const vet = await userService.findById(Number(vaccine.vetId));

        let vaccineCopy: any = {...vaccine, pet: pet, vet: vet};
        return vaccineCopy;
    }

    async findAllByUserId(userId: number): Promise<VaccineReturnType[] | undefined> {
        const vaccines = await this.vaccineRepository.findAllByUserId(userId);

        if(!vaccines) {
            throw new HttpError("Não foi possívle encontrar nenhum pedido de exame.", 404);
        }

        const vaccinesCopy = Promise.all(vaccines.map(async vaccine => {
            let pet = await petService.findById(Number(vaccine.petId));
            let vet = await userService.findById(Number(vaccine.vetId));

            let vaccineCopy: any = {...vaccine, pet: pet, vet: vet};
            return vaccineCopy;
        }));

        return vaccinesCopy;
    }

    async findAllByPetId(petId: number): Promise<VaccineReturnType[] | undefined> {
        const vaccines = await this.vaccineRepository.findAllByPetId(petId);

        if(!vaccines) {
            throw new HttpError("Não foi possívle encontrar nenhum pedido de exame.", 404);
        }

        const vaccinesCopy = Promise.all(vaccines.map(async vaccine => {
            let pet = await petService.findById(Number(vaccine.petId));
            let vet = await userService.findById(Number(vaccine.vetId));

            let vaccineCopy: any = {...vaccine, pet: pet, vet: vet};
            return vaccineCopy;
        }));

        return vaccinesCopy;
    }
}