'use client';

import { ConfirmModal } from '@/components';
import NavigationLayout from '@/components/NavigationLayout';
import { SearchX, LocateFixed } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import restaurantInMap from '@/assets/restaurants-in-map.png';
import restaurantInStreet from '@/assets/restaurants-in-street.png';
import { Constants } from '@/configs';
import { useLocationUser } from '@/contexts';
import { useRouter } from 'next/navigation';
import type { LocationDetails } from '@/models/LocationDetails';

export default function Restaurants() {
  const router = useRouter();
  const {
    selectedLocation,
    setSelectedLocation,
    selectedCity,
    setSelectedCity,
    handleLocationPermission,
    getLocationDetails,
  } = useLocationUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'address' | 'city'>('address');
  const [input, setInput] = useState<LocationDetails>();
  const inputRef = useRef(null);

  const handlePlaceChanged = useCallback(async (address: google.maps.places.Autocomplete) => {
    const place = address.getPlace();

    if (!place || !place.geometry) {
      setInput({});
      return;
    }

    formData(place);
  }, []);

  const formData = (data: google.maps.places.PlaceResult) => {
    const addressComponents = data?.address_components;
    const formattedFullAddress = data?.formatted_address;

    const componentMap = {
      subPremise: '',
      premise: '',
      street_number: '',
      route: '',
      country: '',
      postal_code: '',
      administrative_area_level_2: '',
      administrative_area_level_1: '',
    };

    if (addressComponents) {
      for (const component of addressComponents) {
        const componentType = component.types[0];
        if (Object.prototype.hasOwnProperty.call(componentMap, componentType)) {
          if (componentType in componentMap) {
            componentMap[componentType as keyof typeof componentMap] = component.long_name;
          }
        }
      }
    }

    const formattedAddress =
      `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
    const latitude = data?.geometry?.location?.lat();
    const longitude = data?.geometry?.location?.lng();

    setInput((values) => ({
      ...values,
      streetAddress: formattedAddress,
      formattedFullAddress,
      country: componentMap.country,
      zipCode: componentMap.postal_code,
      city: componentMap.administrative_area_level_2,
      state: componentMap.administrative_area_level_1,
      latitude: latitude,
      longitude: longitude,
    }));
  };

  useEffect(() => {
    if (isModalOpen) {
      const options = {
        componentRestrictions: { country: 'br' },
        fields: ['address_components', 'geometry'],
      };

      if (inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
        autocomplete.addListener('place_changed', () => handlePlaceChanged(autocomplete));
      }
    } else {
      inputRef.current = null;
      setInput({});
    }
  }, [isModalOpen, handlePlaceChanged]);

  const openModal = (modalType: 'address' | 'city') => {
    setModalType(modalType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCity('');
    setIsModalOpen(false);
  };

  const handleConfirmCityModal = () => {
    setIsModalOpen(false);
    if (modalType === 'city' && selectedCity) {
      router.push(`/restaurants/${selectedCity}`);
    }
    if (modalType === 'address' && input) {
      const { streetAddress, latitude, longitude, city } = input;
      const selectedCity = Constants.DEFAULT_CITIES_OPTIONS.find(
        (option) => option.label === city
      )?.value;
      if (!selectedCity) {
        alert(
          'O endereco selecionado nao é uma cidade participante. Volte e tente novamente com outro endereco.'
        );
        return;
      }
      if (!latitude || !longitude || !selectedCity) {
        alert('Nao foi possivel prosseguir. Volte e tente novamente.');
        return;
      }
      setSelectedLocation({ latitude, longitude });
      setSelectedCity(selectedCity);
      router.push(
        `/restaurants/${selectedCity}${streetAddress ? `streetAddress=${streetAddress}` : ''}`
      );
    }
  };

  const onClickCurrentLocation = async () => {
    try {
      handleLocationPermission();
      if (!selectedLocation) {
        return;
      }

      const locationInfo = await getLocationDetails();
      if (!locationInfo) {
        alert('Nao foi possivel obter a sua localizacao. Tente novamente.');
        return;
      }
      setInput((values) => ({
        ...values,
        streetAddress: locationInfo?.streetAddress,
        formattedFullAddress: locationInfo?.formattedFullAddress,
        country: locationInfo?.country,
        zipCode: locationInfo?.zipCode,
        city: locationInfo?.city,
        state: locationInfo?.state,
        latitude: locationInfo?.latitude,
        longitude: locationInfo?.longitude,
      }));
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const isEnabledConfirm = (): boolean => {
    if (modalType === 'address' && input?.city) {
      return input?.city.length > 0;
    }
    if (modalType === 'city') {
      return selectedCity.length > 0;
    }
    return false;
  };

  return (
    <NavigationLayout>
      <div className="flex flex-row flex-wrap items-stretch justify-center py-4 shadow-lg gap-8">
        <div className="max-w-1/3 h-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="h-1/2 rounded-t-lg">
            <Image src={restaurantInMap} width={1024} height={1024} alt="Resturants in map" />
          </div>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Encontre os restaurantes por endereco
            </h5>
            <p className="mb-3 font-medium text-gray-400/75 text-justify">
              Busque o restaurantes mais proximo de voce ou pelo endereco que desejar, e descubra os
              pratos participantes.
            </p>
            <button
              type="button"
              onClick={() => openModal('address')}
              className="w-full min-h-10 inline-flex items-center justify-end-safe gap-2 p-2 font-bold text-center text-white bg-amber-500/45 rounded-lg hover:bg-amber-500/55 focus:ring-4 focus:outline-none focus:ring-amber-300 cursor-pointer">
              Buscar por endereco
              <SearchX />
            </button>
          </div>
        </div>

        <div className="max-w-1/3 h-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="h-1/2 rounded-t-lg">
            <Image src={restaurantInStreet} width={1024} height={1024} alt="Resturants in map" />
          </div>
          <div className="p-5 h-full">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              Encontre os restaurantes pela cidade
            </h5>
            <p className="mb-3 font-medium text-gray-400/75 text-justify">
              Busque o restaurantes participantes e seus pratos filtrando pela cidade.
            </p>
            <button
              type="button"
              onClick={() => openModal('city')}
              className="w-full min-h-10 inline-flex items-center justify-end-safe gap-2 p-2 font-bold text-center text-white bg-amber-500/45 rounded-lg hover:bg-amber-500/55 focus:ring-4 focus:outline-none focus:ring-amber-300 cursor-pointer">
              Buscar por cidade
              <SearchX />
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        title="Pesquisar"
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmCityModal}
        isEnabledConfirm={isEnabledConfirm()}>
        <div className="w-full font-sans flex flex-col items-stretch justify-center gap-2">
          <div>
            <p className="font-light text-base">
              Busque os restaurantes participantes e seus pratos.
            </p>
            {modalType === 'address' ? (
              <>
                <p className="font-thin text-[0.9rem]">
                  Pesquise um endereco e veja se existe restaurantes próximos participantes.
                </p>
                <p className="font-thin text-[0.8rem]">
                  É possível também buscar pela sua posicao gps atual.
                </p>
              </>
            ) : (
              <p className="font-thin text-[0.9rem]">
                Selecione entre as opcoes uma das cidades participantes.
              </p>
            )}
          </div>
          {modalType === 'address' && (
            <div className="flex flex-row items-center justify-center gap-2">
              <label htmlFor="address" className="sr-only font-bold text-black">
                Endereço
              </label>
              <input
                type="text"
                id="address"
                name="address"
                ref={inputRef}
                value={input?.formattedFullAddress}
                placeholder="Pesquise um endereço"
                className="py-2 w-full text-sm font-light text-start text-black bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              />

              <div className="has-tooltip">
                <span className="tooltip rounded shadow-lg p-2 bg-white text-black -mt-8 -ml-24 text-[0.6rem] font-sans text-justify">
                  Utilizar minha localização
                </span>
                <button
                  type="button"
                  onClick={onClickCurrentLocation}
                  className="min-w-10 min-h-10 inline-flex items-center justify-end-safe gap-2 p-2 font-light text-[0.9rem] text-center text-white bg-amber-500/95 rounded-lg hover:bg-amber-500/55 focus:ring-4 focus:outline-none focus:ring-amber-300 cursor-pointer">
                  <LocateFixed className="max-h-1/2" />
                </button>
              </div>
            </div>
          )}
          {modalType === 'city' && (
            <>
              <label htmlFor="city_select" className="sr-only font-bold text-black">
                Cidade
              </label>
              <select
                id="city_select"
                onChange={(e) => {
                  const selectedCity = e.target.value;
                  setSelectedCity(selectedCity);
                }}
                defaultValue={selectedCity}
                className="py-2 w-full text-sm font-light text-start text-black bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                <option value="">Selecione uma cidade</option>
                {Constants.DEFAULT_CITIES_OPTIONS.map((city) => (
                  <option value={city.value} key={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </ConfirmModal>
    </NavigationLayout>
  );
}
