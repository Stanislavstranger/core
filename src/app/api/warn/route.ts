export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { handleServerError } from '@/shared/lib/handle-server-error';
import { AppError } from '@/shared/errors';

export async function GET() {
  try {
    throw new AppError('Validation failed', 400, 'VALIDATION');
  } catch (e) {
    const { status } = await handleServerError(e, {
      route: '/api/warn',
      method: 'GET',
      test: true,
    });
    return NextResponse.json({ ok: false }, { status });
  }
}
