import api from "../../../config/axios";
import { IUserGet } from "../../model/user";

class VetRepository {
  path = "user";

  async list(): Promise<IUserGet[]> {
    return await api.get(this.path+"/owner/search/").then((response) => response.data);
  }

  async getById(id: string): Promise<IUserGet> {
    return await api
      .get(`${this.path}/${id}`)
      .then((response) => response.data);
  }

  async getDates(id: string): Promise<string[]> {
    return await api.get(`${this.path}/owner/search/vet/${id}/dates/`).then((response) => response.data);
  }

  async getDateAvailableTimes(id: string, date: string) {
    return await api.get(`${this.path}/owner/search/vet/${id}/${date}/times`).then((response) => response.data);
  }
}
export default VetRepository;
