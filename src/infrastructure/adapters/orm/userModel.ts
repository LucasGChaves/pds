import { Model } from 'objection';
import { RoleModel } from './roleModel';
import { PetModel } from './petModel';
import { VaccineModel } from './vaccineModel';
import { AppointmentModel } from './appointmentModel';
import { ExamRequestModel } from './examRequestModel';
export class UserModel extends Model {
  static tableName = 'user';
  
  id!: number;
  firstName!: string;
  lastName!: string;
  password!: string;
  phone!: string;
  email!: string;
  cpf!: string;
  crmv?: string;
  cnpj?: string;
  photoFileName?: string;
  roleId!: number; 
  
  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: RoleModel,
      join: {
        from: "role.id",
        to:"user.roleId"
      }
    },
    pet: {
      relation: Model.HasManyRelation,
      modelClass: PetModel,
      join: {
        from: "user.id",
        to: "pet.ownerId"
      }
    },
    vaccine: {
      relation: Model.HasManyRelation,
      modelClass: VaccineModel,
      join: {
        from: "user.id",
        to: "vaccine.vetId"
      }
    },
    examRequest: {
      relation: Model.HasManyRelation,
      modelClass: ExamRequestModel,
      join: {
        from: "user.id",
        to: "examRequest.vetId"
      }
    },
    appointment: {
      relation: Model.HasManyRelation,
      modelClass: AppointmentModel,
      join: {
        from: "user.id",
        to: "appointment.vetId"
      }
    }
  }
}