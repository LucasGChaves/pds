import { ExamRequest } from "../../domain/entities/examRequest";
import { ExamRequestRepositoryInterface } from "../../domain/ports/examRequestRepositoryInterface";
import { PetRepository } from "../../infrastructure/adapters/repository/petRepository";
import { PetService } from "./petService";
import { UserRepository } from "../../infrastructure/adapters/repository/userRepository";
import { UserService } from "./userService";
import { HttpError } from "../../api/middlewares/errors";
import { ExamRequestReturnType } from "../../infrastructure/types/examRequest";

const petRepository = new PetRepository();
const petService = new PetService(petRepository);

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class ExamRequestService {
    constructor(private examRequestRepository: ExamRequestRepositoryInterface) {}

    async createExamRequest(examRequest: Partial<ExamRequest>): Promise<ExamRequestReturnType> {
        const createdExamRequest = await this.examRequestRepository.createExamRequest(examRequest);

        if(!createdExamRequest) {
            throw new HttpError("Não foi possível criar o pedido de exame.", 400);
        }

        const pet = await petService.findById(Number(createdExamRequest.petId));
        const vet = await userService.findById(Number(createdExamRequest.vetId));

        let examRequestCopy: any = {...createdExamRequest, pet: pet, vet: vet};
        return examRequestCopy;
    }

    async updateExamRequest(id: number, updatedData: Partial<ExamRequest>): Promise<ExamRequestReturnType | undefined> {
        const updatedExamRequest = await this.examRequestRepository.updateExamRequest(id, updatedData);

        if(!updatedExamRequest) {
            throw new HttpError("Não foi possívle encontrar o pedido de exame desejado.", 404);
        }

        const pet = await petService.findById(Number(updatedExamRequest.petId));
        const vet = await userService.findById(Number(updatedExamRequest.vetId));

        let examRequestCopy: any = {...updatedExamRequest, pet: pet, vet: vet};
        return examRequestCopy;
    }

    async deleteExamRequest(id: number): Promise<boolean | undefined> {
        return await this.examRequestRepository.deleteExamRequest(id);
    }

    async findById(id: number): Promise<ExamRequestReturnType | undefined> {
        const examRequest = await this.examRequestRepository.findById(id);

        if(!examRequest) {
            throw new HttpError("Não foi possívle encontrar o pedido de exame desejado.", 404);
        }

        const pet = await petService.findById(Number(examRequest.petId));
        const vet = await userService.findById(Number(examRequest.vetId));

        let examRequestCopy: any = {...examRequest, pet: pet, vet: vet};
        return examRequestCopy;
    }

    async findAllByUserId(userId: number): Promise<ExamRequestReturnType[] | undefined> {
        const examRequests = await this.examRequestRepository.findAllByUserId(userId);

        if(!examRequests) {
            throw new HttpError("Não foi possívle encontrar nenhum pedido de exame.", 404);
        }

        const examRequestsCopy = Promise.all(examRequests.map(async examRequest => {
            let pet = await petService.findById(Number(examRequest.petId));
            let vet = await userService.findById(Number(examRequest.vetId));

            let examRequestCopy: any = {...examRequest, pet: pet, vet: vet};
            return examRequestCopy;
        }));

        return examRequestsCopy;
    }

    async findAllByPetId(petId: number): Promise<ExamRequestReturnType[] | undefined> {
        const examRequests = await this.examRequestRepository.findAllByPetId(petId);

        if(!examRequests) {
            throw new HttpError("Não foi possívle encontrar nenhum pedido de exame.", 404);
        }

        const examRequestsCopy = Promise.all(examRequests.map(async examRequests => {
            let pet = await petService.findById(Number(examRequests.petId));
            let vet = await userService.findById(Number(examRequests.vetId));

            let examRequestsCopy: any = {...examRequests, pet: pet, vet: vet};
            return examRequestsCopy;
        }));

        return examRequestsCopy;
    }
}