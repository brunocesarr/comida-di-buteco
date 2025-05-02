import { getLocationDetails } from '@/repositories/google.repository';
import { NextResponse, type NextRequest } from 'next/server';

export const revalidate = 2;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if (!latitude || !longitude) {
      return NextResponse.json({ message: 'Latitude and longitude are required' }, { status: 400 });
    }

    const locationDetails = await getLocationDetails(
      Number.parseFloat(latitude),
      Number.parseFloat(longitude)
    );

    return NextResponse.json({
      ...locationDetails,
    });
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { message: 'Error fetching location details', error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
