import type {
  RestaurantInfoResponse,
  RestaurantsInfoResponse,
} from '@/models/api/restaurantsInfoResponse';
import { getRestaurantsInfoBySite } from '@/repositories/comidaDiButeco.respository';
import { NextResponse } from 'next/server';

export const revalidate = 2;

export async function GET(request: Request, { params }: { params: Promise<{ city: string }> }) {
  try {
    const { city } = await params;
    const restaurants: RestaurantInfoResponse[] = await getRestaurantsInfoBySite(city);
    const restaurantsInfo: RestaurantsInfoResponse = {
      restaurants,
      count: restaurants.length,
    };
    return NextResponse.json(restaurantsInfo);
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { message: 'Error fetching restaurants', error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
