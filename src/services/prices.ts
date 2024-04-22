import { GameCurrent, GameLowest, GameBundle, GameInfo, LowestData} from '../types';
import { BundleResponse } from '../new_types';

const apiKey = import.meta.env.VITE_ITAD_API_KEY;

export const fetchPrices = async (gameIds: string[]) => {
  gameIds = ['01849783-6a26-7147-ab32-71804ca47e8e',]
  const url = `https://api.isthereanydeal.com/games/prices/v2?key=${apiKey}`;


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(gameIds),
    });

    if (!response.ok) throw new Error('Error en la petición');

    const data = await response.json();
    console.log(data);

    // for (const game of Object.values(data.data)) {
    //   if (game.list?.length) {
    //     prices.push(...game.list.map((item: any) => ({
    //       priceNew: item.price_new,
    //       priceOld: item.price_old,
    //       shop: item.shop.name,
    //     })));
    //   }
    // }

    return data;
  } catch (error) {
    console.log(error)
    console.error('Error al realizar la petición:', error);
    throw error;
  }
};

export const fetchLowPrice = async (gameName: string) => {
  const url = `https://api.isthereanydeal.com/games/historylow/v1?key=${apiKey}`
  try {
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(gameName),
    });

    if (!response.ok) throw new Error('Error en la petición');

    const data = await response.json();
    const firstGame: GameLowest | undefined = Object.values(data.data)[0] as GameLowest;

    if (firstGame) {
      const { price, cut, shop } = firstGame;

      return {
        priceNew: price,
        cut,
        shop: shop.name,
      };
    } else {
      console.log("No se encontraron datos de juegos.");
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error);
    throw error;
  }
};

export const fetchBundles = async (gameName: string) => {
  const url = `https://api.isthereanydeal.com/games/bundles/v2?key=${apiKey}&id=${gameName}`;
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error('Error en la petición');

    const data = await response.json();
    console.log(data);
    let bundles;
    if(data.length === 0) {
      bundles = [];
    }
    else{
      const bundles: BundleResponse[] = data.list.map((bundle: BundleResponse) => ({
        title: bundle.title,
        bundle: bundle.page.name,
        expiry: bundle.expiry,
      }));
    }

    console.log(bundles);

    return bundles;

  } catch (error) {
    console.error('Error al realizar la petición:', error);
    throw error;
  }
}

export const fetchGameInfo = async (gameName: string) => {
  console.log(gameName);
  const url = `https://api.isthereanydeal.com/games/info/v2?key=${apiKey}&id=${gameName}`;
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error('Error en la petición');

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al realizar la petición:', error);
    throw error;
  }
}
