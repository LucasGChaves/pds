export class ExamRequest {

    id!: number
    vetSignature!: string
    result?: string
    resultFile?: string
    petId!: number
    vetId!: number
    appointmentId!: number

    constructor (exam: Partial<ExamRequest>) {
        Object.assign(this, exam);
    }
}