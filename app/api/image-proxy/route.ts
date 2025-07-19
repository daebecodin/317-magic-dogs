import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing image URL', { status: 400 });
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      console.error(`Failed to fetch image from external URL: ${imageUrl}, Status: ${response.status}`);
      return new NextResponse(`Failed to fetch image: ${response.statusText}`, { status: response.status });
    }

    // Get content type from the original response
    const contentType = response.headers.get('Content-Type');

    // Return the image data directly
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': contentType || 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache images aggressively
      },
    });
  } catch (error) {
    console.error('Error in image proxy:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}