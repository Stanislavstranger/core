export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { handleServerError } from '@/shared/lib/handle-server-error';

export async function GET() {
  try {
    throw new Error('Manual server crash test');
  } catch (e) {
    const { status } = await handleServerError(e, {
      route: '/api/crash',
      method: 'GET',
      test: true,
    });
    return NextResponse.json({ ok: false }, { status });
  }
}
