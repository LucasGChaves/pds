import { useQuery } from "react-query";
import { ReactQueryCache, STALE_TIME } from "../../enums/reactQueryCacheEnum";
import UserRepository from "../repository/userRepository";

export const useLoggedUser = () => {
  return useQuery(
    [ReactQueryCache.LOGGED_USER],
    async () => {
      const userRepository = new UserRepository();
      return await userRepository.getUserInfo();
    },
    {
      staleTime: STALE_TIME,
    }
  );
};
