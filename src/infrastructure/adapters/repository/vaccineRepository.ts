import { Vaccine } from "../../../domain/entities/vaccine";
import { VaccineRepositoryInterface} from "../../../domain/ports/vaccineRepositoryInterface";
import { VaccineModel } from "../orm/vaccineModel";
import { HttpError } from "../../../api/middlewares/errors";

export class VaccineRepository implements VaccineRepositoryInterface {
    async createVaccine(vaccine: Partial<Vaccine>): Promise<Vaccine> {
        const createdVaccine = await VaccineModel.query().insert(vaccine);
        if(!createdVaccine) {
            throw new HttpError("Não foi possível criar a vacina.", 500);
        }
        return new Vaccine(createdVaccine);
    }

    async updateVaccine(id: number, updatedData: Partial<Vaccine>): Promise<Vaccine | undefined> {
        const updatedVaccine = await VaccineModel.query().where("id", id).patchAndFetch(updatedData);
        if(!updatedVaccine) {
            throw new HttpError("Vacina não encontrada.", 500);
        }
        return updatedVaccine;
    }

    async deleteVaccine(id: number): Promise<boolean | undefined> {
        try {
            await VaccineModel.query().where("id", id).del();
            return true;
        } catch (err: any) {
            throw new HttpError(err.message || "Não foi possível deletar a vacina solicitada", 500);
        }
    }

    async findById(id: number): Promise<Vaccine | undefined> {
        const vaccine = await VaccineModel.query().findById(id);
        return vaccine;
    }

    async findAllByUserId(userId: number): Promise<Vaccine[] | undefined> {
        const vaccines = await VaccineModel.query().where("userId", userId);
        return vaccines;
    }

    async findAllByPetId(petId: number): Promise<Vaccine[] | undefined> {
        const vaccines = await VaccineModel.query().where("petId", petId);
        return vaccines;
    }
}