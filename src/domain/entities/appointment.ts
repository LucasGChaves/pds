export default class Appointment {

    readonly appointmentDate: Date
    readonly description: string
    readonly petId: string
    readonly vetId: string

    constructor(data: Appointment) {
        this.appointmentDate = data.appointmentDate;
        this.description = data.description;
        this.petId = data.petId;
        this.vetId = data.vetId;
    }
}