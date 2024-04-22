import { useQueries } from "@tanstack/react-query";
import { fetchPrices, fetchLowPrice, fetchBundles, fetchGameInfo } from "../services/prices";
import { useDebounce } from "./useDebounce";

export const useGame = (query: string) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['game', query],
        queryFn: async () => {
          try {
            const result = await fetchPrices([query,]);
            return {
              game: result, 
            };
          } catch (error) {
            throw error;
          }
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 3,
      },
      {
        queryKey: ['lowest', query],
        queryFn: async () => {
          try {
           
            const result = await fetchLowPrice(query);
            return {
              lowest: result, 
            };
          } catch (error) {
            throw error;
          }
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 3,
      },
      {
        queryKey: ['bundles',query],
        queryFn: async () => {
          try {
            const result = await fetchBundles(query);
            return {
              bundles: result, 
            };
          } catch (error) {
            throw error;
          }
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 3,
      },
      {
        queryKey: ['gameInfo',query],
        queryFn: async () => {
          try {
            const result = await fetchGameInfo(query);
            return {
              gameInfo: result,
            };
          } catch (error) {
            throw error;
          }
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 3,
      }
    ]
  })

  const currentQuery = queries[0];
  const lowestQuery = queries[1];
  const bundlesQuery = queries[2];
  const gameInfoQuery = queries[3];

  const isLoading = currentQuery.isLoading && lowestQuery.isLoading && bundlesQuery.isLoading && gameInfoQuery.isLoading;
  const isError = currentQuery.isError || lowestQuery.isError || bundlesQuery.isError || gameInfoQuery.isError;


  return {
    currentData: currentQuery.data,
    lowestData: lowestQuery.data,
    bundlesData: bundlesQuery.data,
    gameInfoData: gameInfoQuery.data,
    isLoading: isLoading,
    isError: isError,
  };
};
