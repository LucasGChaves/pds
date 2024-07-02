import { useQuery } from "react-query";
import { ReactQueryCache, STALE_TIME } from "../../enums/reactQueryCacheEnum";
import PetRepository from "../repository/petRepository";

export const usePet = (id: string) => {
  return useQuery(
    [ReactQueryCache.PET, id],
    async () => {
      const petRepository = new PetRepository("owner");
      return await petRepository.getById(id);
    },
    {
      staleTime: STALE_TIME,
    }
  );
};
