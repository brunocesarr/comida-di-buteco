'use client';

import { Gallery } from '@/components/Gallery';
import type { RestaurantInfoResponse } from '@/models/api/restaurantsInfoResponse';
import { getRestaurantsSortedByLocation } from '@/services/comidaDiButeco.service';
import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Constants } from '@/configs';
import { useLocationUser } from '@/contexts';
import NavigationLayout from '@/components/NavigationLayout';
import { MapComponent } from '@/components/Map';
import { MapIcon, LucideGalleryHorizontal } from 'lucide-react';

export default function RestaurantsByCityPage() {
  const streetAddress = useSearchParams().get('streetAddress');
  const params = useParams<{ city: string }>();
  const router = useRouter();
  const { selectedLocation, selectedCity } = useLocationUser();
  const [restaurants, setRestaurants] = useState<RestaurantInfoResponse[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>('');
  const [city, setCity] = useState<string | undefined>(undefined);
  const [viewType, setViewType] = useState<'list' | 'map'>('list');

  useEffect(() => {
    if (!selectedCity) {
      router.push('/');
    } else if (selectedCity !== params.city) {
      router.replace(`/restaurants/${selectedCity}`);
    }
  }, [selectedCity, params.city, router]);

  useEffect(() => {
    const cityParam = params.city;
    if (!Constants.DEFAULT_CITIES_OPTIONS.some((city) => city.value === cityParam)) {
      router.push('/');
      return;
    }
    setCity(cityParam);
  }, [params, router]);

  useEffect(() => {
    if (city) {
      const fetchRestaurants = async () => {
        try {
          setLoading(true);
          const restaurants = await getRestaurantsSortedByLocation(
            city,
            selectedLocation?.latitude,
            selectedLocation?.longitude
          );
          if (!restaurants) {
            throw new Error('Network response was not ok');
          }
          setRestaurants(restaurants);
        } catch (error) {
          setError('Error fetching sorted restaurants');
          console.error('Fetch Error:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchRestaurants();
    }
  }, [selectedLocation, city]);

  const cityName = Constants.DEFAULT_CITIES_OPTIONS.find((option) => option.value === city)?.label;

  return (
    <NavigationLayout>
      {isLoading && (
        <div className="flex flex-row flex-wrap items-center justify-center gap-8 m-8">
          {Array.from({ length: 7 }, (_, index) => index).map((value) => {
            return (
              <div key={value} className="animate-pulse flex items-center flex-col gap-4">
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm dark:bg-gray-700">
                  <svg
                    className="w-full h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="w-full">
                  <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-xs mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="flex justify-end right-0 h-2">
                    <div className="content-end right-0 w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[60px]"></div>
                  </div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            );
          })}
        </div>
      )}
      {error && (
        <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {!cityName && !selectedLocation && (
        <div className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
          <p className="text-white text-2xl">
            Please allow location access to see the restaurants.
          </p>
          <p className="text-white">Please select a location to see the restaurants.</p>
        </div>
      )}
      {restaurants.length > 0 && (
        <div className="max-w-full flex flex-col gap-[8px] items-center justify-center py-8 bg-black/45 backdrop-blur-l">
          {cityName && (
            <div className="max-w-5xl flex flex-col items-center justify-center gap-y-2">
              <h1 className="text-4xl font-thin text-white font-display border-0 border-b border-b-gray-100/15">
                {cityName}
              </h1>
              {streetAddress && (
                <p className="font-thin text-sm">
                  Resultados encontrados próximos ao endereco: {streetAddress}
                </p>
              )}
            </div>
          )}
          <div className="w-full max-w-6xl flex flex-row items-center justify-end gap-y-2">
            <button
              className="bg-black-100/15 border border-spacing-0.5 border-white text-white text-[0.6rem] text-center rounded-2xl p-2 mt-4 cursor-pointer flex flex-col items-center justify-center gap-y-1"
              onClick={() => setViewType(viewType === 'list' ? 'map' : 'list')}>
              {viewType === 'list' ? (
                <>
                  <MapIcon />
                  Ver Mapa
                </>
              ) : (
                <>
                  <LucideGalleryHorizontal />
                  Ver Lista
                </>
              )}
            </button>
          </div>
          {viewType === 'list' && <Gallery restaurants={restaurants} />}
          {viewType === 'map' && (
            <MapComponent restaurants={restaurants} selectedLocation={selectedLocation} />
          )}
        </div>
      )}
    </NavigationLayout>
  );
}
