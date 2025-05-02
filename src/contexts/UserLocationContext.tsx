'use client';

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useModal } from '@/contexts/ModalContext';
import type { LocationDetails, Location } from '@/models/LocationDetails';
import {
  getCurrentLocation,
  getLocationDetailsInfo,
  getLocationByCity,
} from '@/repositories/comidaDiButeco.respository';

interface UserLocationContextData {
  currentLocation?: Location;
  selectedLocation?: Location;
  setSelectedLocation: Dispatch<SetStateAction<Location | undefined>>;
  selectedCity: string;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  handleLocationPermission: () => void;
  getLocationDetails: () => Promise<LocationDetails | undefined>;
  getLocationDetailsByCity: (city: string) => Promise<void>;
}

export const UserLocationContext = createContext({} as UserLocationContextData);

interface UserLocationProviderProps {
  children: string | ReactNode;
}

export const UserLocationProvider = ({ children }: UserLocationProviderProps) => {
  const { openModal, closeModal } = useModal();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isLocationEnabled, setIsLocationEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (isLocationEnabled && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }: { coords: GeolocationCoordinates }) => {
          const { latitude, longitude } = coords;
          setCurrentLocation({ latitude, longitude });
          if (!selectedLocation) {
            setSelectedLocation({ latitude, longitude });
          }
        },
        async (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for geolocation');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out');
              break;
            default:
              console.error('An unknown error occurred' + error.message);
              break;
          }

          const { latitude, longitude } = await getCurrentLocation();
          setCurrentLocation({ latitude, longitude });
          if (!selectedLocation) {
            setSelectedLocation({ latitude, longitude });
          }
        }
      );
    }
  }, [isLocationEnabled, selectedLocation]);

  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        setIsLocationEnabled(permissionStatus.state === 'granted');
        if (permissionStatus.state === 'denied') {
          setCurrentLocation(undefined);
        }
      });
    }
  }, []);

  const handleLocationPermission = () => {
    if (!isLocationEnabled) {
      openModal(
        'Permissao de Localização',
        <div className="flex flex-col items-stretch mt-2 max-w-5xl gap-y-4">
          <div className="flex shrink-0 flex-wrap items-center justify-end text-black">
            Habilite a localizacao do seu navegador para utilizar sua posicao atual.
          </div>
          <button
            className="bg-amber-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-amber-600"
            onClick={() => {
              closeModal();
              navigator.geolocation.getCurrentPosition(
                ({ coords }: { coords: GeolocationCoordinates }) => {
                  const { latitude, longitude } = coords;
                  setCurrentLocation({ latitude, longitude });
                  setSelectedLocation({ latitude, longitude });
                },
                async (error) => {
                  switch (error.code) {
                    case error.PERMISSION_DENIED:
                      console.error('User denied the request for geolocation');
                      break;
                    case error.POSITION_UNAVAILABLE:
                      console.error('Location information is unavailable');
                      break;
                    case error.TIMEOUT:
                      console.error('The request to get user location timed out');
                      break;
                    default:
                      console.error('An unknown error occurred' + error.message);
                      break;
                  }

                  const { latitude, longitude } = await getCurrentLocation();
                  setCurrentLocation({ latitude, longitude });
                  if (!selectedLocation) {
                    setSelectedLocation({ latitude, longitude });
                  }
                }
              );
            }}>
            Habilitar
          </button>
        </div>
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords }: { coords: GeolocationCoordinates }) => {
          const { latitude, longitude } = coords;
          setCurrentLocation({ latitude, longitude });
          setSelectedLocation({ latitude, longitude });
        },
        async (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for geolocation');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out');
              break;
            default:
              console.error('An unknown error occurred' + error.message);
              break;
          }

          const { latitude, longitude } = await getCurrentLocation();
          setCurrentLocation({ latitude, longitude });
          if (!selectedLocation) {
            setSelectedLocation({ latitude, longitude });
          }
        }
      );
    }
  };

  const getLocationDetails = async () => {
    if (!currentLocation) {
      return;
    }
    const { latitude, longitude } = currentLocation;
    return await getLocationDetailsInfo(latitude, longitude);
  };

  const getLocationDetailsByCity = async (city: string) => {
    if (!city) {
      return;
    }
    const { latitude, longitude } = await getLocationByCity(city);
    if (!latitude || !longitude) {
      return;
    }
    setSelectedLocation({ latitude, longitude });
  };

  return (
    <UserLocationContext.Provider
      value={{
        currentLocation,
        selectedLocation,
        setSelectedLocation,
        selectedCity,
        setSelectedCity,
        handleLocationPermission,
        getLocationDetails,
        getLocationDetailsByCity,
      }}>
      {children}
    </UserLocationContext.Provider>
  );
};

export const useLocationUser = () => useContext(UserLocationContext);
