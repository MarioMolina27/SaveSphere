import { useQuery } from "@tanstack/react-query";
import { fetchGameSearch } from "../services/search";
import { useDebounce } from "./useDebounce";


export const useGameSearch = (query: string) => {
    
    const {data, isError,isLoading} = useQuery({
        queryKey: ['gameSearch', query],
        queryFn: async () => {
            try {
                const result = await fetchGameSearch(query);
                return result;
            } catch (error) {
                throw error;
            }
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 3,
    });

    return { dataSearch: data, isErrorSearch: isError, isLoadingSearch: isLoading};
}