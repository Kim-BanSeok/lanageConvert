import { NextResponse } from 'next/server';
import { generateCsrfToken } from '@/app/lib/csrf';

/**
 * CSRF 토큰 발급 API
 * GET /api/csrf-token
 */
export async function GET() {
  try {
    const token = await generateCsrfToken();
    
    return NextResponse.json({
      token,
      message: 'CSRF token generated successfully'
    });
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

