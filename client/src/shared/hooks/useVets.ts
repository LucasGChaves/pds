import { useQuery } from "react-query";
import { ReactQueryCache, STALE_TIME } from "../../enums/reactQueryCacheEnum";
import VetRepository from "../repository/vetRepository";

export const useVets = () => {
  return useQuery(
    [ReactQueryCache.VETS],
    async () => {
      const vetRepository = new VetRepository();
      return await vetRepository.list();
    },
    {
      staleTime: STALE_TIME,
    }
  );
};
