import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { prompt, width, height, seed } = await req.json();

    const response = await fetch(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${seed}&width=${width}&height=${height}&nologo=true`,
      {
        method: 'GET',
        signal: AbortSignal.timeout(15000), // 15 second timeout
      }
    );

    if (!response.ok) {
      throw new Error('Image generation failed');
    }

    // Get the image URL
    const imageUrl = response.url;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
} 