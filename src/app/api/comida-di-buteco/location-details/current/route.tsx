import { geolocation } from '@vercel/functions';
import { NextResponse, type NextRequest } from 'next/server';

export const revalidate = 2;

export async function GET(request: NextRequest) {
  try {
    const details = geolocation(request);
    return Response.json(details);
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { message: 'Error fetching current location', error: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
