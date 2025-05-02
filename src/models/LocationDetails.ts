export interface LocationDetails {
  streetAddress?: string; // Street address part
  formattedFullAddress?: string; // Complete formatted address
  country?: string; // Country name
  zipCode?: string; // Postal/ZIP code
  city?: string; // City name
  state?: string; // State/Province
  latitude?: number; // Geographic coordinate
  longitude?: number; // Geographic coordinate
}
