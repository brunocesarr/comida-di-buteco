'use client';

// Import necessary modules and functions from external libraries and our own project
import { type Libraries, useJsApiLoader } from '@react-google-maps/api';
import type { ReactNode } from 'react';

// Define a list of libraries to load from the Google Maps API
const libraries = ['places', 'drawing', 'geometry'];

// Define a function component called MapProvider that takes a children prop
export function MapProvider({ children }: { children: ReactNode }) {
  // Load the Google Maps JavaScript API asynchronously
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libraries as Libraries,
  });

  if (loadError)
    return (
      <p className="container mx-auto py-8 px-4 rounded-lg max-w-8/12 bg-black/45 backdrop-blur-lg">
        Encountered error while loading google maps
      </p>
    );

  if (!scriptLoaded)
    return (
      <p className="container mx-auto py-8 px-4 rounded-lg max-w-8/12 bg-black/45 backdrop-blur-lg">
        Map Script is loading ...
      </p>
    );

  // Return the children prop wrapped by this MapProvider component
  return children;
}
