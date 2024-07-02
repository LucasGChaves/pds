import api from "../../../config/axios";
import { IPet, IPetRegistrationFormData } from "../../model/pet";

class PetRepository {
  path: string;

  constructor(role: string) {
    if (role === "owner") {
      this.path = "user/owner/pets";
    }
    this.path = "user/vet/pets";
  }

  async create(body: IPetRegistrationFormData): Promise<IPet> {
    return await api.post(this.path, body).then((response) => response.data);
  }

  async list(): Promise<IPet[]> {
    return await api.get(this.path).then((response) => response.data);
  }

  async edit(body: IPetRegistrationFormData): Promise<IPet> {
    return await api
      .put(`${this.path}/${body?.id}`, body)
      .then((response) => response.data);
  }

  async getById(id: string): Promise<IPet> {
    return await api
      .get(`${this.path}/${id}`)
      .then((response) => response.data);
  }

  async delete(id: string) {
    return await api.delete(`${this.path}/${id}`);
  }
}

export default PetRepository;
