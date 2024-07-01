import { useQuery } from "react-query";
import { ReactQueryCache, STALE_TIME } from "../../enums/reactQueryCacheEnum";
import VetRepository from "../repository/vetRepository";

export const useVet = (id: string) => {
  return useQuery(
    [ReactQueryCache.VET],
    async () => {
      const vetRepository = new VetRepository();
      return await vetRepository.getById(id);
    },
    {
      staleTime: STALE_TIME,
    }
  );
};
