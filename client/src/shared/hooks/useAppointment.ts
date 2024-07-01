import { useQuery } from "react-query";
import { ReactQueryCache, STALE_TIME } from "../../enums/reactQueryCacheEnum";
import AppointmentRepository from "../repository/appointmentRepository";

interface Params {
  role: "owner" | "vet";
  id: string;
}

export const useAppointment = ({ role, id }: Params) => {
  return useQuery(
    [ReactQueryCache.APPOINTMENT, role],
    async () => {
      const appointmentRepository = new AppointmentRepository(role);
      return await appointmentRepository.getById(id);
    },
    {
      staleTime: STALE_TIME,
    }
  );
};
