'use server';

import { revalidatePath } from 'next/cache';
import { servicesRepository } from './services.repository';
import { captureServer } from '@/shared/lib/exceptionless';
import type { CreateServiceListElementCommand } from './model/types';

export const createServiceAction = async (
  revalidatePagePath: string,
  command: CreateServiceListElementCommand,
) =>
  captureServer(
    async () => {
      await servicesRepository.createServiceElement(command);
      revalidatePath(revalidatePagePath);
    },
    { op: 'createService', revalidatePagePath },
  );
