'use client';
import { Button } from '@/shared/ui/button';
import { Exceptionless } from '@exceptionless/react';

export function TestButton() {
  return (
    <Button
      variant="destructive"
      size="lg"
      className="mb-5"
      onClick={async () => {
        try {
          throw new Error('Client crash test from Next.js');
        } catch (err) {
          if (err instanceof Error) {
            await Exceptionless.submitException(err);
            alert('Exception sent');
          }
        }
      }}
    >
      Throw error
    </Button>
  );
}
