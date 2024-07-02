import { useQuery } from "react-query";
import { ReactQueryCache, STALE_TIME } from "../../enums/reactQueryCacheEnum";
import AppointmentRepository from "../repository/appointmentRepository";

interface Params {
  role: string;
}

export const useAppointments = ({ role }: Params) => {
  return useQuery(
    [ReactQueryCache.APPOINTMENTS, role],
    async () => {
      const appointmentRepository = new AppointmentRepository(role);
      return await appointmentRepository.list();
    },
    {
      staleTime: STALE_TIME,
    }
  );
};
