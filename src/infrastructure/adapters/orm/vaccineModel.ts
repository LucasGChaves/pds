import { Model } from 'objection';
import { PetModel } from './petModel';
import { UserModel } from './userModel';


export class VaccineModel extends Model {
    static tableName = 'vaccine';
    
    id!: number;
    vaccineName!: string;
    manufacturer!: string;
    batch!: string;
    applicationDate!: Date;
    petId!: number;
    vetId!: number;
    
    // static relationMappings = {
    //   pet: {
    //     relation: Model.BelongsToOneRelation,
    //     modelClass: PetModel,
    //     join: {
    //       from: "vaccine.petId",
    //       to:"pet.id"
    //     }
    //   },
    //   user: {
    //     relation: Model.BelongsToOneRelation,
    //     modelClass: UserModel,
    //     join: {
    //       from: "vaccine.ownerId",
    //       to: "user.id"
    //     }
    //   }
    // }
  }