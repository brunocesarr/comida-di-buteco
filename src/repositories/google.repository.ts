import { AddressType, type GeocodeResponse } from '@googlemaps/google-maps-services-js';
import { googleClient } from './base/apiGoogle';
import type { LocationDetails } from '@/models/LocationDetails';

async function getRestaurantLocation(
  restaurantAddress: string
): Promise<{ latitude: number; longitude: number }> {
  const { data }: GeocodeResponse = await googleClient.geocode({
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
      address: restaurantAddress,
    },
  });

  if (data.status !== 'OK' || data.error_message) {
    throw 'Error fetching geocode data';
  }

  return {
    latitude: data.results[0].geometry.location.lat,
    longitude: data.results[0].geometry.location.lng,
  };
}

async function getRestaurantDistance(
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number }
): Promise<number> {
  const result = await googleClient.directions({
    params: {
      origin,
      destination,
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
    },
  });

  if (result.data.routes.length === 0) {
    throw new Error('No routes found');
  }

  return result.data.routes[0].legs[0].distance.value;
}

async function getLocationDetails(latitude: number, longitude: number): Promise<LocationDetails> {
  const { data } = await googleClient.reverseGeocode({
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
      latlng: { latitude, longitude },
    },
  });

  if (data.status !== 'OK' || data.error_message) {
    throw 'Error fetching geocode data';
  }

  return {
    streetAddress: data.results[0].formatted_address,
    formattedFullAddress: data.results[0].formatted_address,
    city: data.results[0].address_components.find((component) =>
      component.types.includes(AddressType.administrative_area_level_2)
    )?.long_name,
    state: data.results[0].address_components.find((component) =>
      component.types.includes(AddressType.administrative_area_level_1)
    )?.long_name,
    country: data.results[0].address_components.find((component) =>
      component.types.includes(AddressType.country)
    )?.long_name,
    zipCode: data.results[0].address_components.find((component) =>
      component.types.includes(AddressType.postal_code)
    )?.long_name,
    latitude: data.results[0].geometry.location.lat,
    longitude: data.results[0].geometry.location.lng,
  };
}

async function getLocationByCity(city: string): Promise<{ latitude: number; longitude: number }> {
  const { data }: GeocodeResponse = await googleClient.geocode({
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
      address: city,
    },
  });

  if (data.status !== 'OK' || data.error_message) {
    throw 'Error fetching geocode data';
  }

  return {
    latitude: data.results[0].geometry.location.lat,
    longitude: data.results[0].geometry.location.lng,
  };
}

export { getRestaurantLocation, getRestaurantDistance, getLocationDetails, getLocationByCity };
