import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const service = searchParams.get('service');
  const apiUrl = searchParams.get('apiUrl');
  const apiKey = searchParams.get('apiKey');

  // Use widget-specific URL or fall back to env variable
  const serviceUrl = apiUrl || process.env.SERVICE_URL;
  const serviceApiKey = apiKey || process.env.SERVICE_API_KEY;

  // Example: proxy request to self-hosted service
  try {
    const response = await axios.get(`${serviceUrl}`, {
      headers: {
        ...(serviceApiKey && { Authorization: `Bearer ${serviceApiKey}` }),
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
