'use client';
import { useEffect } from 'react';
import { Exceptionless, ExceptionlessErrorBoundary } from '@exceptionless/react';

const enabled = process.env.NEXT_PUBLIC_EXCEPTIONLESS_ENABLED === '1';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!enabled) return;

    Exceptionless.startup((c) => {
      c.apiKey = process.env.NEXT_PUBLIC_EXCEPTIONLESS_API_KEY!;
      c.defaultTags.push('nextjs', 'app-router');
    });
  }, []);

  return enabled ? (
    <ExceptionlessErrorBoundary>{children}</ExceptionlessErrorBoundary>
  ) : (
    <>{children}</>
  );
}
