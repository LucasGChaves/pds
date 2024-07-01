export class Vaccine {
  id!: number
  vaccineName!: string
  manufacturer!: string
  batch!: string
  applicationDate!: Date
  petId!: number
  vetId!: number

  constructor (vaccine: Partial<Vaccine>) {
    Object.assign(this, vaccine);
  }
}