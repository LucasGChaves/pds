import { useQuery } from "react-query";
import { ReactQueryCache, STALE_TIME } from "../../enums/reactQueryCacheEnum";
import VaccineRepository from "../repository/vaccineRepository";

export const useVaccines = () => {
  return useQuery(
    [ReactQueryCache.VACCINES],
    async () => {
      const vaccineRepository = new VaccineRepository();
      return await vaccineRepository.list();
    },
    {
      staleTime: STALE_TIME,
    }
  );
};
