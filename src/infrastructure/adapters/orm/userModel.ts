import { Model } from 'objection';
import { RoleModel } from './roleModel';

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
    }
  }
}