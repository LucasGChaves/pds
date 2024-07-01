import { Model } from 'objection';
import { UserModel } from './userModel';
import { VaccineModel } from './vaccineModel';
import { AppointmentModel } from './appointmentModel';
import { ExamRequestModel } from './examRequestModel';

export class PetModel extends Model {
  static tableName = 'pet';
  
  id!: number
  name!: string
  birthDate!: Date
  species!: string
  breed?: string
  photoFileName?: string;
  ownerId!: string
  
  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: "pet.ownerId",
        to:"user.id"
      }
    },
    vaccine: {
      relation: Model.HasManyRelation,
      modelClass: VaccineModel,
      join: {
        from: "pet.id",
        to: "vaccine.petId"
      }
    },
    examRequest: {
      relation: Model.HasManyRelation,
      modelClass: ExamRequestModel,
      join: {
        from: "pet.id",
        to: "examRequest.petId"
      }
    },
    appointment: {
      relation: Model.HasManyRelation,
      modelClass: AppointmentModel,
      join: {
        from: "pet.id",
        to: "appointment.petId"
      }
    }
  }
}