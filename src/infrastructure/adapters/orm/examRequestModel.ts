import { Model } from 'objection';
import { UserModel } from './userModel';
import { PetModel } from './petModel';

export class ExamRequestModel extends Model {
  static tableName = 'examRequest';

  id!: number
  vetSignature!: string
  result?: string
  resultFile?: string
  petId!: number
  vetId!: number
  appointmentId!: number

  static relationMappings = {
    user: {
      relation: Model.HasOneRelation,
      modelClass: UserModel,
      join: {
        from: "examRequest.vetId",
        to: "user.id"
      }
    },
    pet: {
        relation: Model.HasOneRelation,
        modelClass: PetModel,
        join: {
            from: "examRequest.petId",
            to: "pet.id"
        }
    }
  }
}