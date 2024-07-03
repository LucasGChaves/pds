import api from "../../../config/axios";
import { ILoginFormData } from "../../model/login";
import { IOwnerRegisterFormData, IVetRegisterFormData } from "../../model/user";

class AuthRepository {
  authPath = "auth";
  userPath = "user";

  async Login(body: ILoginFormData) {
    return await api
      .post(`${this.authPath}/login/`, body)
      .then((response) => response.data);
  }

  async RegisterOwner(body: IOwnerRegisterFormData) {
    return await api
      .post(`${this.userPath}/register/`, body)
      .then((response) => response.data);
  }

  async RegisterVet(body: IVetRegisterFormData) {
    return await api
      .post(`${this.userPath}/register/`, body)
      .then((response) => response.data);
  }
}

export default AuthRepository;
