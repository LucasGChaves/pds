import { Model } from 'objection';

export class RoleModel extends Model {
  static tableName = 'role';

  id!: number;
  roleName!: string;
}