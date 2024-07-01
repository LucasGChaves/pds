import api from "../../../config/axios";

class VetRepository {
  path = "";

  async list() {
    return await api.get(this.path).then((response) => response.data);
  }

  async getById(id: string) {
    return await api
      .get(`${this.path}/${id}`)
      .then((response) => response.data);
  }
}

export default VetRepository;
