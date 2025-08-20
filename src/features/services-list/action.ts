'use server';

import { revalidatePath } from 'next/cache';
import { CreateServiceListElementCommand } from './model/types';
import { servicesRepository } from './services.repository';

export const createServiceAction = async (
  revalidatePagePath: string,
  command: CreateServiceListElementCommand,
) => {
  await servicesRepository.createServiceElement(command);

  revalidatePath(revalidatePagePath);
};
