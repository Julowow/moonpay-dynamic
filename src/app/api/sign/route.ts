import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const secretKey = process.env.MOONPAY_SECRET_KEY || '';
    
    if (!secretKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(new URL(body.url).search)
      .digest('base64');

    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Signing error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
