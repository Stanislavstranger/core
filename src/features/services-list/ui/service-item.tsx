'use client';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { ServiceListElement } from '../model/types';
import { Button } from '@/shared/ui/button';
import { useTransition } from 'react';

export function ServiceItem({
  service,
  onDeleteAction,
}: {
  service: ServiceListElement;
  onDeleteAction: () => Promise<void>;
}) {
  const [isLoadingDelete, startDeleteTransition] = useTransition();

  function handleDelete() {
    startDeleteTransition(async () => {
      await onDeleteAction();
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{service.name}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleDelete} disabled={isLoadingDelete}>
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
}
