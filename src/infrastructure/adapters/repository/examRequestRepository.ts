import { ExamRequest } from "../../../domain/entities/examRequest";
import { ExamRequestRepositoryInterface } from "../../../domain/ports/examRequestRepositoryInterface";
import { ExamRequestModel } from "../orm/examRequestModel";
import { HttpError } from "../../../api/middlewares/errors";

export class ExamRequestRepository implements ExamRequestRepositoryInterface {
    async createExamRequest(examRequest: Partial<ExamRequest>): Promise<ExamRequest> {
        const createdExamRequest = await ExamRequestModel.query().insert(examRequest);
        if(!createdExamRequest) {
            throw new HttpError("Não foi possível criar o pedido de exame.", 500);
        }
        return new ExamRequest(createdExamRequest);
    }

    async updateExamRequest(id: number, updatedData: Partial<ExamRequest>): Promise<ExamRequest | undefined> {
        const updatedExamRequest = await ExamRequestModel.query().patchAndFetchById(id, updatedData);
        if(!updatedExamRequest) {
            throw new HttpError("Pedido de exame não encontrado.", 500);
        }
        return updatedExamRequest; 
    }

    async deleteExamRequest(id: number): Promise<boolean | undefined> {
        try {
            await ExamRequestModel.query().where("id", id).del();
            return true;
        } catch (err: any) {
            throw new HttpError(err.message || "Não foi possível deletar o pedido de exame solicitado", 500);
        }
    }

    async findById(id: number): Promise<ExamRequest | undefined> {
        const examRequest = await ExamRequestModel.query().findById(id);
        return examRequest;
    }

    async findAllByUserId(userId: number): Promise<ExamRequest[] | undefined> {
        const examRequests = await ExamRequestModel.query().where("vetId", userId);
        return examRequests;
    }

    async findAllByPetId(petId: number): Promise<ExamRequest[] | undefined> {
        const examRequests = await ExamRequestModel.query().where("petId", petId);
        return examRequests;
    }
    async findByAppointmentId(appointmentId: number): Promise<ExamRequest | undefined> {
        const examRequest = await ExamRequestModel.query().where("appointmentId", appointmentId).first();
        return examRequest;
    }
}