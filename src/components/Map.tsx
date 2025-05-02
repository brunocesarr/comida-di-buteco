/*Since the map was loaded on client side,
we need to make this component client rendered as well*/
'use client';

import { useLocationUser } from '@/contexts';
import type { RestaurantInfoResponse } from '@/models/api/restaurantsInfoResponse';
//Map component Component from library
import { GoogleMap, Marker, OverlayView } from '@react-google-maps/api';
import Image from 'next/image';
import { memo, useCallback, useRef, useState } from 'react';

//Map's styling
const defaultMapContainerStyle = {
  width: '100%',
  height: '100vh',
  borderRadius: '16px',
};

//Default zoom level, can be adjusted
const defaultMapZoom = 14;

//Map options
const defaultMapOptions: google.maps.MapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: 'auto',
  mapTypeId: 'roadmap',
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],

  fullscreenControl: false,
  streetViewControl: false,
};

export const MapComponent = ({ restaurants }: { restaurants: RestaurantInfoResponse[] }) => {
  return (
    <div className="w-full max-w-6xl max-h-8/12">
      <CustomMap>
        <CustomMarkers restaurants={restaurants} />
      </CustomMap>
    </div>
  );
};

const CustomMap = memo(({ children }: { children: React.ReactNode }) => {
  const { currentLocation } = useLocationUser();
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  if (!currentLocation) {
    return <div>Loading...</div>;
  }

  const mapCenter = {
    lat: currentLocation?.latitude ?? 0,
    lng: currentLocation?.longitude ?? 0,
  };

  return (
    <GoogleMap
      mapContainerStyle={defaultMapContainerStyle}
      center={mapCenter}
      zoom={defaultMapZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={defaultMapOptions}>
      {children}
    </GoogleMap>
  );
});

CustomMap.displayName = 'CustomMap';

const CustomMarkers = memo(({ restaurants }: { restaurants: RestaurantInfoResponse[] }) => {
  const { currentLocation } = useLocationUser();
  const [hoveredRestaurant, setHoveredRestaurant] = useState<RestaurantInfoResponse>();

  if (!currentLocation) {
    return <div>Loading...</div>;
  }

  const createRestaurantPinSVG = () => {
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
        <!-- Pin shape -->
        <path
          d="M20 2C12.3 2 6 8.3 6 16C6 24.5 20 38 20 38C20 38 34 24.5 34 16C34 8.3 27.7 2 20 2Z"
          fill="#7C0A02"
          stroke="#420D09"
          stroke-width="1.5"
        />
        <!-- Restaurant icon (fork and knife) -->
        <g transform="translate(13, 8)" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round">
          <!-- Fork (left) -->
          <path d="M3 1v14 M0 2v4 M6 2v4 M0 6h6" />
          <!-- Knife (right) -->
          <path d="M11 1v14 M9 1c4 0 4 5 0 7v7" />
        </g>
      </svg>
    `;

    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgString);
  };

  const restaurantPinIcon = {
    url: createRestaurantPinSVG(),
    scaledSize: new window.google.maps.Size(40, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(20, 38), // Bottom center of the pin
  };

  return (
    <>
      <Marker position={{ lat: currentLocation.latitude, lng: currentLocation.longitude }} />
      {restaurants.map(
        (restaurant) =>
          restaurant.location && (
            <div key={restaurant.name}>
              <Marker
                position={{
                  lat: restaurant.location.latitude,
                  lng: restaurant.location.longitude,
                }}
                icon={restaurantPinIcon}
                onClick={() => {
                  window.open(restaurant.detailsLink, '_blank');
                }}
                onMouseOver={() => {
                  setHoveredRestaurant(restaurant);
                }}
                onMouseOut={() => setHoveredRestaurant(undefined)}
              />
              {/* Toast/Tooltip overlay */}
              {hoveredRestaurant?.name === restaurant.name && (
                <OverlayView
                  position={{
                    lat: restaurant.location.latitude,
                    lng: restaurant.location.longitude,
                  }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  getPixelPositionOffset={(width, height) => ({
                    x: -width / 2,
                    y: -height - 45, // Position above the marker
                  })}>
                  <div className="animate-fade-in restaurant-toast bg-white/65 backdrop-blur-lg rounded-lg shadow-lg p-3 w-64">
                    <div className="flex flex-col">
                      <Image
                        src={restaurant.image ?? ''}
                        alt={restaurant.name}
                        width={100}
                        height={100}
                        className="w-full h-24 rounded object-cover mr-3"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{restaurant.address}</p>
                  </div>
                </OverlayView>
              )}
            </div>
          )
      )}
    </>
  );
});

CustomMarkers.displayName = 'CustomMarkers';
