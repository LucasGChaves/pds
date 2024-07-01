export class Pet {

  id!: number
  name!: string
  birthDate!: Date
  species!: string
  breed?: string
  photoFileName?: string;
  ownerId!: number

  constructor (pet: Partial<Pet>) {
    Object.assign(this, pet);
  }
}