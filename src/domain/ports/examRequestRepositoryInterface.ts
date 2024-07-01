import { ExamRequest } from "../entities/examRequest";

export interface ExamRequestRepositoryInterface {
    createExamRequest(examRequest: Partial<ExamRequest>): Promise<ExamRequest>;
    updateExamRequest(id: number, updatedData: Partial<ExamRequest>): Promise<ExamRequest | undefined>;
    deleteExamRequest(id: number): Promise<boolean | undefined>;
    findById(id: number): Promise<ExamRequest | undefined>;
    findAllByUserId(userId: number): Promise<ExamRequest[] | undefined>;
    findAllByPetId(petId: number): Promise<ExamRequest[] | undefined>;
    findByAppointmentId(appointmentId: number): Promise<ExamRequest | undefined>;
}