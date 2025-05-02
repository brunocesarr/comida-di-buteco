import { Constants, LocalStorageKeysCache } from '@/configs';
import type {
  RestaurantInfoResponse,
  RestaurantsInfoResponse,
} from '@/models/api/restaurantsInfoResponse';
import apiComidaDiButeco from '@/repositories/base/apiComidaDiButeco';
import localStorageService from '@/services/localStorage.service';

async function getRestaurantsSortedByLocation(
  city: string = Constants.DEFAULT_CITY_URL_PARAM,
  latitude: number | null = null,
  longitude: number | null = null
): Promise<RestaurantInfoResponse[]> {
  try {
    let cacheKey = `${LocalStorageKeysCache.COMIDA_DI_BUTECO_RESTAURANTS_INFO}-${city}`;
    if (latitude && longitude) {
      cacheKey += `-${latitude}-${longitude}`;
    }

    const restaurants: RestaurantInfoResponse[] = localStorageService.getItem(cacheKey);
    if (restaurants && restaurants.length > 0) return restaurants;

    let url = `/api/comida-di-buteco/${city}`;
    if (latitude && longitude) {
      url += `/near?latitude=${latitude}&longitude=${longitude}`;
    }

    const { data } = await apiComidaDiButeco.get<RestaurantsInfoResponse>(url);

    if (data) {
      localStorageService.setItem(cacheKey, data.restaurants);
    }

    return data.restaurants;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('Error fetching sorted restaurants');
  }
}

export { getRestaurantsSortedByLocation };
