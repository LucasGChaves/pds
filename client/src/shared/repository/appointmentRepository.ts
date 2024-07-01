import api from "../../../config/axios";
import {
  IAppointmentDetailsFormData,
  INewAppointmentTimeFormData,
} from "../../model/appointment";

class AppointmentRepository {
  path: string;

  constructor(role: "owner" | "vet") {
    if (role === "owner") {
      this.path = "user/owner/appointments";
    }
    this.path = "user/vet/appointments";
  }

  async create(body: INewAppointmentTimeFormData) {
    return await api.post(this.path, body);
  }

  async list() {
    return await api.get(this.path).then((response) => response.data);
  }

  async edit(body: IAppointmentDetailsFormData) {
    return await api.put(`${this.path}/${body.id}`, body);
  }

  async getById(id: string) {
    return await api
      .get(`${this.path}/${id}`)
      .then((response) => response.data);
  }
}

export default AppointmentRepository;
