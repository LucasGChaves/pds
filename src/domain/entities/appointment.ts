export class Appointment {

    id!: number
    appointmentDate!: Date
    appointmentTime!: string
    description?: string
    scheduled!: boolean
    petId?: number | null
    vetId!: number

    constructor (appointment: Partial<Appointment>) {
        Object.assign(this, appointment);
    }
}