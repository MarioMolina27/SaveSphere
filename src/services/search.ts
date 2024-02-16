import type { GameSearchResponse } from '../types';
import { removeDuplicateResults } from '../utils/utils';
const apiKey = import.meta.env.VITE_ITAD_API_KEY;

export const fetchGameSearch = async (gameName: string) => {
    if (gameName === '') {
        return [];
    }
    
    const url = `https://private-anon-c333487004-itad.apiary-proxy.com/v02/search/search/?key=${apiKey}&q=${gameName}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        let data = await response.json() as GameSearchResponse;

        data = removeDuplicateResults(data)

        return data.data.results;
    }
    catch (error) {
        throw error;
    }
}

