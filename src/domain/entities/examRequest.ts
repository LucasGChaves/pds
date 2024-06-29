export default class ExamRequest {

    readonly vetSignature: string
    readonly result: string
    readonly resultFile: File
    readonly petId: string
    readonly vetId: string

    constructor(data: ExamRequest) {
        this.vetSignature = data.vetSignature;
        this.result = data.result;
        this.resultFile = data.resultFile;
        this.petId = data.petId;
        this.vetId = data.vetId;
    }
}