import { ExamRequest } from "../../domain/entities/examRequest";
import { ExamRequestRepositoryInterface } from "../../domain/ports/examRequestRepositoryInterface";
import { HttpError } from "../../api/middlewares/errors";

export class ExamRequestService {
    constructor(private examRequestRepository: ExamRequestRepositoryInterface) {}

    async createExamRequest(examRequest: Partial<ExamRequest>): Promise<ExamRequest | undefined> {
        const createdExamRequest = await this.examRequestRepository.createExamRequest(examRequest);

        if(!createdExamRequest) {
            throw new HttpError("Não foi possível criar o pedido de exame.", 400);
        }
        return createdExamRequest;
    }

    async updateExamRequest(id: number, updatedData: Partial<ExamRequest>): Promise<ExamRequest | undefined> {
        const updatedExamRequest = await this.examRequestRepository.updateExamRequest(id, updatedData);

        if(!updatedExamRequest) {
            throw new HttpError("Não foi possível encontrar o pedido de exame desejado.", 404);
        }
        return updatedExamRequest;
    }

    async deleteExamRequest(id: number): Promise<boolean | undefined> {
        return await this.examRequestRepository.deleteExamRequest(id);
    }

    async findById(id: number): Promise<ExamRequest | undefined> {
        const examRequest = await this.examRequestRepository.findById(id);

        if(!examRequest) {
            throw new HttpError("Não foi possível encontrar o pedido de exame desejado.", 404);
        }
        return examRequest;
    }
}