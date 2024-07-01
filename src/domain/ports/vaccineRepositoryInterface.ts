import { Vaccine } from "../entities/vaccine";

export interface VaccineRepositoryInterface {
  createVaccine(user: Partial<Vaccine>): Promise<Vaccine>;
  updateVaccine(id: number, updatedData: Partial<Vaccine>): Promise<Vaccine | undefined>;
  deleteVaccine(id: number): Promise<boolean | undefined>;
  findById(id: number): Promise<Vaccine | undefined>;
  findAllByUserId(userId: number): Promise<Vaccine[] | undefined>;
  findAllByPetId(petId: number): Promise<Vaccine[] | undefined>;
}