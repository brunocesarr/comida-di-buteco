type RestaurantInfoResponse = {
  image?: string;
  name: string;
  address: string;
  detailsLink?: string;
  howToGetThereLink?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
};

type RestaurantNearInfoResponse = RestaurantInfoResponse & {
  distance: number;
};

type RestaurantsInfoResponse = {
  restaurants: RestaurantInfoResponse[] | RestaurantNearInfoResponse[];
  count: number;
};

export type { RestaurantInfoResponse, RestaurantsInfoResponse };
