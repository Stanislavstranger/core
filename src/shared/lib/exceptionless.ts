import 'server-only';
import { Exceptionless } from '@exceptionless/node';
import { Prisma } from '@prisma/client';
import { getRequestId } from '@/shared/server/request-id';

const enabled = process.env.EXCEPTIONLESS_ENABLED === '1';

export async function captureServer<T>(
  fn: () => Promise<T>,
  context?: Record<string, unknown>,
): Promise<T> {
  try {
    return await fn();
  } catch (e: unknown) {
    const err = e instanceof Error ? e : new Error(typeof e === 'string' ? e : 'Non-Error thrown');

    if (!enabled) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[captureServer]', err);
      }
      throw err;
    }

    let ev = Exceptionless.createException(err);

    if (context) {
      for (const [k, v] of Object.entries(context)) ev = ev.setProperty(k, v);
    }

    const rid = await getRequestId();
    if (rid) ev = ev.setProperty('requestId', rid);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      ev = ev.setProperty('prisma.code', e.code);
      if (e.meta) ev = ev.setProperty('prisma.meta', e.meta as unknown);
    }

    await ev.submit();
    throw err;
  }
}
