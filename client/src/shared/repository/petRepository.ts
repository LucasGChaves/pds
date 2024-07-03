import api from "../../../config/axios";
import { IPet, IPetRegistrationFormData } from "../../model/pet";

class PetRepository {
  petPath: string;
  ownerPath: string;
  vetPath: string;
  role: string;

  constructor(role: string) {
    // if (role === "owner") {
    //   this.path = "user/owner/pets";
    // }
    // this.path = "user/vet/pets";
    this.petPath = "pet";
    this.ownerPath = "user/owner/pets/";
    this.vetPath ="user/vet/patients/";
    this.role = role;
  }

  async create(body: IPetRegistrationFormData): Promise<IPet> {
    return await api.post(this.petPath, body).then((response) => response.data);
  }

  async list(): Promise<IPet[]> {
    if(this.role === "owner") {
      return await api.get(this.ownerPath).then((response) => response.data);
    }
    return await api.get(this.vetPath).then((response) => response.data); 
  }

  async edit(body: IPetRegistrationFormData): Promise<IPet> {
    return await api
      .put(`${this.petPath}/${body?.id}/`, body)
      .then((response) => response.data);
  }

  async getById(id: string): Promise<IPet> {
    return await api
      .get(`${this.petPath}/${id}/`)
      .then((response) => response.data);
  }

  async delete(id: string) {
    return await api.delete(`${this.petPath}/${id}/`);
  }
}

export default PetRepository;
