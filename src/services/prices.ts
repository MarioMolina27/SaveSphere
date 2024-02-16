import { GameCurrent, GameLowest, GameBundle, GameInfo, LowestData} from '../types';
import { formatingUnixDate } from '../utils/utils';
import { formatingQuery } from '../utils/utils';

const apiKey = import.meta.env.VITE_ITAD_API_KEY;

export const fetchPrices = async (gameName: string) => {
    const url = `https://private-anon-2bf9bed617-itad.apiary-proxy.com/v01/game/prices/?key=${apiKey}&plains=${formatingQuery(gameName)}&region=eu2`;
    try {
      const response = await fetch(url);      if (!response.ok) {
        throw new Error('Error en la petición');
      }
  
      const data = await response.json();
      const firstGame: GameCurrent | undefined = Object.values(data.data)[0] as GameCurrent;

      // Verificar si hay juegos y si la lista no está vacía
      if (firstGame && firstGame.list && firstGame.list.length > 0) {
        const prices = firstGame.list.map((game) => ({
          priceNew: game.price_new,
          priceOld: game.price_old,
          shop: game.shop.name,
        }));
  
        return prices;
      } else {
        console.log("No se encontraron datos de juegos.");
        return [];
      }
    } catch (error) {
      console.error('Error al realizar la petición:');
    }
  };

  export const fetchLowPrice = async (gameName: string) => {
    const url = `https://private-anon-2bf9bed617-itad.apiary-proxy.com/v01/game/lowest/?key=${apiKey}&plains=${formatingQuery(gameName)}&shops=steam%2Cgog%2Cepic%2Chumblestore`
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Error en la petición');
      }
  
      const data = await response.json();
      const firstGame: GameLowest | undefined = Object.values(data.data)[0] as GameLowest;
  
      if (firstGame) {
        const priceNew = firstGame.price;
        const cut = firstGame.cut;
        const shop = firstGame.shop.name;
        
        return {
          priceNew,
          cut,
          shop,
        };
      } else {
        console.log("No se encontraron datos de juegos.");
        let empty = {} as LowestData;
        return empty ;
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      throw error;
    }
  };

  export const fetchBundles = async (gameName: string) => {
    const url = `https://private-anon-240f96f87f-itad.apiary-proxy.com/v01/game/bundles/?key=${apiKey}&plains=${formatingQuery(gameName)}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const data = await response.json();
      const gameBundle: GameBundle | undefined = Object.values(data.data)[0] as GameBundle;
      const bundles = gameBundle.list.map((bundle) => ({
        title: bundle.title,
        bundle: bundle.bundle,
        expiry: formatingUnixDate(bundle.expiry),
      }));
        
      return bundles;
      
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      throw error;
    }
  }

  export const fetchGameInfo = async (gameName: string) => {
    const url = `https://private-anon-5b349637e2-itad.apiary-proxy.com/v01/game/info/?key=${apiKey}&plains=${formatingQuery(gameName)}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const data = await response.json();
      const keys = Object.keys(data.data);

      const gameInfo = data.data[keys[0]] as GameInfo;
      
      return gameInfo;
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      throw error;
    }
  }
  