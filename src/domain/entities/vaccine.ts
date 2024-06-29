export default class Vaccine {

    readonly vaccineName: string
    readonly manufacturer: string
    readonly batch: string
    readonly petId: string
    readonly vetId: string

    constructor(data: Vaccine) {
        this.vaccineName = data.vaccineName;
        this.manufacturer = data.manufacturer;
        this.batch = data.batch;
        this.petId = data.petId;
        this.vetId = data.vetId;
    }
}