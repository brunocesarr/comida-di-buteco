import { getLocationByCity } from '@/repositories/google.repository';
import { NextResponse, type NextRequest } from 'next/server';

export const revalidate = 2;

export async function GET(request: NextRequest, { params }: { params: Promise<{ city: string }> }) {
  try {
    const { city } = await params;

    if (!city) {
      return NextResponse.json({ message: 'City are required' }, { status: 400 });
    }

    const locationDetails = await getLocationByCity(city);

    return NextResponse.json({
      ...locationDetails,
    });
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { message: 'Error fetching location details by city', error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
