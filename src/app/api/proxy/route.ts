import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const service = searchParams.get('service');

  // Example: proxy request to self-hosted service
  try {
    const response = await axios.get(`${process.env.SERVICE_URL}`, {
      headers: {
        Authorization: `Bearer ${process.env.SERVICE_API_KEY}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
