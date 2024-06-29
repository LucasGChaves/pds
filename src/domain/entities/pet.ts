export class Pet {

    readonly name: string
    readonly birthDate: Date
    readonly species: string
    readonly breed: string
    readonly ownerId: string
    readonly photo: File

    constructor(data: Pet) {
        this.name = data.name;
        this.birthDate = data.birthDate;
        this.species = data.species;
        this.breed = data.breed;
        this.ownerId = data.ownerId;
        this.photo = data.photo;
    }
}