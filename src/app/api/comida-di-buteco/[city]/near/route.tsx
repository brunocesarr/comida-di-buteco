import type {
  RestaurantInfoResponse,
  RestaurantsInfoResponse,
} from '@/models/api/restaurantsInfoResponse';
import { getRestaurantsInfoBySite } from '@/repositories/comidaDiButeco.respository';
import { getRestaurantDistance } from '@/repositories/google.repository';
import { NextResponse, type NextRequest } from 'next/server';

export const revalidate = 2;

export async function GET(request: NextRequest, { params }: { params: Promise<{ city: string }> }) {
  try {
    const { city } = await params;
    const searchParams = request.nextUrl.searchParams;
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if (!latitude || !longitude) {
      return NextResponse.json({ message: 'Latitude and longitude are required' }, { status: 400 });
    }

    const restaurants: RestaurantInfoResponse[] = await getRestaurantsInfoBySite(city);
    const restaurantsDistanceTasks = restaurants.map(async (restaurant) => {
      const distance = await getRestaurantDistance(
        {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude),
        },
        {
          latitude: restaurant.location?.latitude ?? 0,
          longitude: restaurant.location?.longitude ?? 0,
        }
      );
      return {
        ...restaurant,
        distance,
      };
    });
    const restaurantsWithDistance = await Promise.all(restaurantsDistanceTasks);
    restaurantsWithDistance.sort((a, b) => a.distance - b.distance);

    return NextResponse.json({
      restaurants: restaurantsWithDistance,
      count: restaurantsWithDistance.length,
    } as RestaurantsInfoResponse);
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { message: 'Error fetching nearby restaurants', error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
