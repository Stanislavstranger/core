import { dbClient } from '@/shared/lib/db';
import { cache } from 'react';
import {
  ServiceListElement,
  CreateServiceListElementCommand,
  DeleteServiceListElementCommand,
} from './model/types';

class ServicesRepository {
  getServicesList = cache((): Promise<ServiceListElement[]> => dbClient.service.findMany());
  createServiceElement = (command: CreateServiceListElementCommand): Promise<ServiceListElement> =>
    dbClient.service.create({ data: command });
  deleteServiceElement = (command: DeleteServiceListElementCommand) =>
    dbClient.service.delete({ where: { id: command.id } });
}

export const servicesRepository = new ServicesRepository();
