import api from "../../../config/axios";
import { IProfileEditionFormData, IUserGet } from "../../model/user";

class UserRepository {
  path = "user";

  //   constructor(role: "owner" | "vet") {
  //     if (role === "owner") {
  //       this.path = "user/owner/";
  //     }
  //     this.path = "user/vet/";
  //   }

  async edit(body: IProfileEditionFormData) {
    return await api.put(`${this.path}/${body?.id}`, body);
  }

  async getById(id: string): Promise<IUserGet> {
    return await api
      .get(`${this.path}/${id}`)
      .then((response) => response.data);
  }

  async getUserInfo(): Promise<IUserGet> {
    return await api.get(`${this.path}`).then((response) => response.data);
  }
}

export default UserRepository;
