import api from "../../../config/axios";
import { IUserGet } from "../../model/user";

class VetRepository {
  path = "";

  async list(): Promise<IUserGet[]> {
    return await api.get(this.path).then((response) => response.data);
  }

  async getById(id: string): Promise<IUserGet> {
    return await api
      .get(`${this.path}/${id}`)
      .then((response) => response.data);
  }
}

export default VetRepository;
