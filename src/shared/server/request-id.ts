import { headers } from 'next/headers';
import { AsyncLocalStorage } from 'node:async_hooks';

type Ctx = { requestId?: string };
export const requestContext = new AsyncLocalStorage<Ctx>();

export async function getRequestId(): Promise<string | undefined> {
  try {
    const h = await headers();
    return h.get('x-request-id') ?? h.get('x-correlation-id') ?? undefined;
  } catch {
    return requestContext.getStore()?.requestId;
  }
}

export async function runWithRequestId<T>(fn: () => Promise<T>, rid?: string): Promise<T> {
  const requestId = rid ?? crypto.randomUUID();
  return requestContext.run({ requestId }, fn);
}
