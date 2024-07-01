import { Vaccine } from "../../domain/entities/vaccine";
import { VaccineRepositoryInterface } from "../../domain/ports/vaccineRepositoryInterface";
import { HttpError } from "../../api/middlewares/errors";


export class VaccineService {
    constructor(private vaccineRepository: VaccineRepositoryInterface){}

    async createVaccine(vaccine: Partial<Vaccine>): Promise<Vaccine> {
        const createdVaccine = await this.vaccineRepository.createVaccine(vaccine);

        if(!createdVaccine) {
            throw new HttpError("Não foi possível encontrar a vacina desejada.", 404);
        }
        return createdVaccine;
    }

    async updateVaccine(petId: number, updatedData: Partial<Vaccine>): Promise<Vaccine | undefined> {
        const updatedVaccine = await this.vaccineRepository.updateVaccine(petId, updatedData);

        if(!updatedVaccine) {
            throw new HttpError("Não foi possível encontrar a vacina desejada.", 404);
        }
        return updatedVaccine;
    }

    async deleteVaccine(petId: number): Promise <boolean | undefined> {
        return await this.vaccineRepository.deleteVaccine(petId);
      }
  
    async findById(id: number): Promise<Vaccine | undefined> {
        const vaccine = await this.vaccineRepository.findById(id);

        if(!vaccine) {
            throw new HttpError("Não foi possível encontrar a vacina desejada.", 404);
        }

        return vaccine;
    }
}