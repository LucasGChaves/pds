import api from "../../../config/axios";
import { IPetRegistrationFormData } from "../../model/pet";
import { IVaccine, IVaccineRegistrationFormData } from "../../model/vaccine";

class VaccineRepository {
  petPath = "pet";
  vaccinePath = "vaccine";
  //   constructor(role: "owner" | "vet") {
  //     if (role === "owner") {
  //       this.path = "user/owner/pets";
  //     }
  //     this.path = "user/vet/pets";
  //   }

  async create(body: IVaccineRegistrationFormData) {
    return await api.post(this.vaccinePath, body);
  }

  async list(id: string): Promise<IVaccine[]> {
    return await api.get(`${this.petPath}/${id}/vaccines/`).then((response) => response.data);
  }

  async delete(id: string) {
    return await api.delete(`${this.vaccinePath}/${id}/`);
  }
}

export default VaccineRepository;
