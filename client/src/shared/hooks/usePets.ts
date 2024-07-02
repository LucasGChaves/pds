import { useQuery } from "react-query";
import { ReactQueryCache, STALE_TIME } from "../../enums/reactQueryCacheEnum";
import PetRepository from "../repository/petRepository";

interface Params {
  role: string;
}

export const usePets = ({ role }: Params) => {
  return useQuery(
    [ReactQueryCache.PETS, role],
    async () => {
      const petRepository = new PetRepository(role);
      return await petRepository.list();
    },
    {
      staleTime: STALE_TIME,
    }
  );
};
