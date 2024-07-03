import { Model } from "objection";
import { UserModel } from "./userModel";
import { PetModel } from "./petModel";

export class AppointmentModel extends Model {
  static tableName = "appointment";
  
  id!: number
  appointmentDate!: Date
  appointmentTime!: string
  scheduled!: boolean
  description?: string
  petId?: number | null
  vetId!: number
  
  // static relationMappings = {
  //   user: {
  //     relation: Model.BelongsToOneRelation,
  //     modelClass: UserModel,
  //     join: {
  //       from: "appointment.vetId",
  //       to:"user.id"
  //     }
  //   },
  //   pet: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: PetModel,
  //       join: {
  //           from: "appointment.petId",
  //           to: "pet.id"
  //       }
  //   }
  // }
}