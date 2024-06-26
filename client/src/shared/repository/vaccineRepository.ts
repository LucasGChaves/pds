import api from "../../../config/axios";
import { IPetRegistrationFormData } from "../../model/pet";
import { IVaccine, IVaccineRegistrationFormData } from "../../model/vaccine";

class VaccineRepository {
  path: "pet/vaccines";

  //   constructor(role: "owner" | "vet") {
  //     if (role === "owner") {
  //       this.path = "user/owner/pets";
  //     }
  //     this.path = "user/vet/pets";
  //   }

  async create(body: IVaccineRegistrationFormData) {
    return await api.post(this.path, body);
  }

  async list(): Promise<IVaccine[]> {
    return await api.get(this.path).then((response) => response.data);
  }

  async delete(id: string) {
    return await api.delete(`${this.path}/${id}`);
  }
}

export default VaccineRepository;
