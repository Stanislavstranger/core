import 'server-only';
import { Exceptionless } from '@exceptionless/node';
import { Prisma } from '@prisma/client';
import { AppError } from '@/shared/errors';
import { ZodError } from 'zod';
import { getRequestId } from '@/shared/server/request-id';

type Ctx = Record<string, unknown>;
const enabled = process.env.EXCEPTIONLESS_ENABLED === '1';

function normalizeError(e: unknown): Error {
  return e instanceof Error ? e : new Error(typeof e === 'string' ? e : 'Non-Error thrown');
}

function classify(e: unknown): { status: number; kind: 'warn' | 'exception'; extra?: Ctx } {
  if (e instanceof AppError)
    return {
      status: e.status,
      kind: e.status < 500 ? 'warn' : 'exception',
      extra: { code: e.code, details: e.details },
    };

  if (e instanceof ZodError) return { status: 400, kind: 'warn', extra: { kind: 'validation' } };

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2025') return { status: 404, kind: 'warn', extra: { prismaCode: e.code } };
    if (e.code === 'P2002') return { status: 409, kind: 'warn', extra: { prismaCode: e.code } };
    return { status: 500, kind: 'exception', extra: { prismaCode: e.code } };
  }

  return { status: 500, kind: 'exception' };
}

export async function handleServerError(e: unknown, context?: Ctx): Promise<{ status: number }> {
  const err = normalizeError(e);
  const { status, kind, extra } = classify(e);
  const baseProps: Ctx = { status, ...context, ...(extra ?? {}) };

  if (!enabled) {
    if (process.env.NODE_ENV !== 'production') {
      const tag = kind === 'warn' ? '[WARN 4xx]' : '[EXC 5xx]';
      console.error(tag, err, baseProps);
    }
    return { status };
  }

  let ev =
    kind === 'warn'
      ? Exceptionless.createLog(err.message, 'Warn').addTags('4xx')
      : Exceptionless.createException(err).addTags('5xx');

  for (const [k, v] of Object.entries(baseProps)) ev = ev.setProperty(k, v);

  const rid = await getRequestId();
  if (rid) ev = ev.setProperty('requestId', rid);

  try {
    await ev.submit();
    console.log('[Exceptionless] submitted', { kind, requestId: rid });
  } catch (sendErr) {
    console.error('[Exceptionless] submit failed', sendErr);
  }
  return { status };
}
