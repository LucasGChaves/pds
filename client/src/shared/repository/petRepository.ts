import api from "../../../config/axios";
import { IPetRegistrationFormData } from "../../model/pet";

class PetRepository {
  path: string;

  constructor(role: "owner" | "vet") {
    if (role === "owner") {
      this.path = "user/owner/pets";
    }
    this.path = "user/vet/pets";
  }

  async create(body: IPetRegistrationFormData) {
    return await api.post(this.path, body);
  }

  async list() {
    return await api.get(this.path).then((response) => response.data);
  }

  async edit(body: IPetRegistrationFormData) {
    return await api.put(`${this.path}/${body?.id}`, body);
  }

  async getById(id: string) {
    return await api
      .get(`${this.path}/${id}`)
      .then((response) => response.data);
  }

  async delete(id: string) {
    return await api.delete(`${this.path}/${id}`);
  }
}

export default PetRepository;
