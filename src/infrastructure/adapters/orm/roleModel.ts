import { Model } from 'objection';
import { UserModel } from './userModel';

export class RoleModel extends Model {
  static tableName = 'role';

  id!: number;
  roleName!: string;

  static relationMappings = {
    user: {
      relation: Model.HasOneRelation,
      modelClass: UserModel,
      join: {
        from: "role.id",
        to: "user.roleId"
      }
    }
  }
}