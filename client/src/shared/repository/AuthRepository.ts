import api from "../../../config/axios";
import { ILogin } from "../../model/login";
import { IOwnerRegisterFormData, IVetRegisterFormData } from "../../model/user";

class AuthRepository {
  path = "";
  async Login(body: ILogin) {
    return await api
      .post(`${this.path}`, body)
      .then((response) => response.data);
  }

  async RegisterOwner(body: IOwnerRegisterFormData) {
    return await api
      .post(`${this.path}/owner`, body)
      .then((response) => response.data);
  }

  async RegisterVet(body: IVetRegisterFormData) {
    return await api
      .post(`${this.path}/vet`, body)
      .then((response) => response.data);
  }
}

export default AuthRepository;
