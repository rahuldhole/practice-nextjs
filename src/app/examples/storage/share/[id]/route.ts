import { blobStorage } from '@/services/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Try to get the raw item from the blob storage
    const value = await blobStorage.getItemRaw(id) || await blobStorage.getItem(id);

    if (value === null || value === undefined) {
      return new NextResponse('Blob not found', { status: 404 });
    }

    // Determine basic content type (this is simplified, a real app might use a library like 'mime-types' or store the mime type in metadata)
    let contentType = 'application/octet-stream';
    if (typeof value === 'string') {
      contentType = 'text/plain; charset=utf-8';
      // If it looks like JSON, return application/json
      if (value.startsWith('{') || value.startsWith('[')) {
        try {
          JSON.parse(value);
          contentType = 'application/json; charset=utf-8';
        } catch {
          // ignore
        }
      }
    }

    return new NextResponse(value as any, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching shared blob:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
