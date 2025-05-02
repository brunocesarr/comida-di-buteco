import type {
  RestaurantInfoResponse,
  RestaurantsInfoResponse,
} from '@/models/api/restaurantsInfoResponse';
import apiComidaDiButeco from '@/repositories/base/apiComidaDiButeco';
import { getRestaurantLocation } from './google.repository';
import * as cheerio from 'cheerio';
import apiComidaDiButecoWeb from './base/apiComidaDiButecoWeb';
import { Constants } from '@/configs';
import type { LocationDetails } from '@/models/LocationDetails';

async function getRestaurantsInfo(): Promise<RestaurantInfoResponse[]> {
  try {
    const { data: restaurantsInfo } =
      await apiComidaDiButeco.get<RestaurantsInfoResponse>('/api/comida-di-buteco');

    return restaurantsInfo.restaurants;
  } catch (error) {
    console.error(`Error in API Comida Di Buteco. Erro message: ${(error as Error).message}`);
    const errorMessage = `API Comida Di Buteco: ${(error as Error).message}`;
    throw new Error(errorMessage);
  }
}

async function getLocationDetailsInfo(
  latitude: number,
  longitude: number
): Promise<LocationDetails> {
  try {
    const { data: locationInfo } = await apiComidaDiButeco.get<LocationDetails>(
      '/api/comida-di-buteco/location-details?latitude=' + latitude + '&longitude=' + longitude
    );

    return locationInfo;
  } catch (error) {
    console.error(`Error in API Comida Di Buteco. Erro message: ${(error as Error).message}`);
    const errorMessage = `API Comida Di Buteco: ${(error as Error).message}`;
    throw new Error(errorMessage);
  }
}

async function getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
  try {
    const { data: locationInfo } = await apiComidaDiButeco.get<{
      latitude: number;
      longitude: number;
    }>('/api/comida-di-buteco/location-details/current');

    return locationInfo;
  } catch (error) {
    console.error(`Error in API Comida Di Buteco. Erro message: ${(error as Error).message}`);
    const errorMessage = `API Comida Di Buteco: ${(error as Error).message}`;
    throw new Error(errorMessage);
  }
}

async function getLocationByCity(city: string): Promise<{ latitude: number; longitude: number }> {
  try {
    const { data: locationInfo } = await apiComidaDiButeco.get<{
      latitude: number;
      longitude: number;
    }>('/api/comida-di-buteco/location-details/' + city);

    return locationInfo;
  } catch (error) {
    console.error(`Error in API Comida Di Buteco. Erro message: ${(error as Error).message}`);
    const errorMessage = `API Comida Di Buteco: ${(error as Error).message}`;
    throw new Error(errorMessage);
  }
}

async function getRestaurantsInfoBySite(
  city: string = Constants.DEFAULT_CITY_URL_PARAM
): Promise<RestaurantInfoResponse[]> {
  const restaurants: RestaurantInfoResponse[] = [];

  let running = true;
  let page = 1;

  while (running) {
    try {
      const url: string = `/${city}/page/${page}`;
      const { data } = await apiComidaDiButecoWeb.get(url, { responseType: 'document' });

      const $ = cheerio.load(data);
      const restaurantWebInfo = $('section.butecos-wrap > .container > .row:last > div > .item');

      if (!restaurantWebInfo) {
        running = false;
      }

      const restaurantInfoTasks = restaurantWebInfo.map(async (_, element) => {
        const image = $(element).find('.image > img').attr('src');
        const name = $(element).find('.caption > h2').text().trim();
        const address = $(element).find('.caption > p').text().trim();
        const detailsLink = $(element).find('div > a:first').attr('href');
        const howToGetThereLink = $(element).find('div > a:last').attr('href');
        restaurants.push({
          image,
          name,
          address,
          detailsLink,
          howToGetThereLink,
          location: await getRestaurantLocation(address),
        });
      });

      await Promise.all(restaurantInfoTasks);

      page += 1;
    } catch (error) {
      running = false;
      console.error('Fetch Error:', error);
    }
  }

  return restaurants;
}

export {
  getRestaurantsInfo,
  getRestaurantsInfoBySite,
  getLocationDetailsInfo,
  getCurrentLocation,
  getLocationByCity,
};
