import { Service } from '@prisma/client';

export type ServiceListElement = Service;
export type CreateServiceListElementCommand = Pick<ServiceListElement, 'name' | 'description'>;
export type DeleteServiceListElementCommand = Pick<ServiceListElement, 'id'>;
