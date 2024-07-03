import api from "../../../config/axios";
import {
  IAppointment,
  IAppointmentDetailsFormData,
  INewAppointmentTimeFormData,
} from "../../model/appointment";

class AppointmentRepository {
  appointmentPath: string;
  userPath: string;
  role: string

  constructor(role: string) {
    // if (role === "owner") {
    //   this.path = "user/owner/appointments";
    // }
    // this.path = "user/vet/appointments";
    this.role = role;
    this.appointmentPath = "appointment";
    this.userPath = "user/appointments/";
  }

  async create(body: INewAppointmentTimeFormData) {
    return await api.post(this.appointmentPath+"/vet/", body);
  }

  async list(): Promise<IAppointment[]> {
    return await api.get(this.userPath).then((response) => response.data);
  }

  async edit(body: IAppointmentDetailsFormData) {
    if(this.role === "vet") {
      return await api.put(`${this.appointmentPath}/${body.id}/vet/`, body);
    }
    if(body && body.petId) {
      return await api.put(`${this.appointmentPath}/${body.id}/owner/`, body);
    }
    return await api.put(`${this.appointmentPath}/${body.id}/owner/cancel/`, body);
  }

  async getById(id: string): Promise<IAppointment> {
    return await api
      .get(`${this.appointmentPath}/${id}`)
      .then((response) => response.data);
  }
}

export default AppointmentRepository;
