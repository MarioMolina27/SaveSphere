import type { GameSearchResponse } from '../new_types';
//import { removeDuplicateResults } from '../utils/utils';

const apiKey = import.meta.env.VITE_ITAD_API_KEY;

export const fetchGameSearch = async (gameName: string) => {
    if (gameName === '')  return []
    const url = `https://api.isthereanydeal.com/games/search/v1?key=${apiKey}&title=${gameName}`;
    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error('Error en la petición');

        let data = await response.json() as GameSearchResponse[] || undefined;
        return data;
    }
    catch (error) {
        throw error;
    }
}

