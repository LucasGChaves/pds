import { Model } from "objection";
import { UserModel } from "./userModel";

export class AddressModel extends Model {
  static tableName = "address";
  
  id!: number;
  state!: number;
  city!: string;
  district!: string;
  street!: string;
  number!: number;
  userId!: number;
  
  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: "address.userId",
        to:"user.id"
      }
    }
  }
}