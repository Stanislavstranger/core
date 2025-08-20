import { Service } from '@prisma/client';

export type ServiceListElement = Pick<Service, 'id' | 'name' | 'description'>;
export type CreateServiceListElementCommand = Pick<ServiceListElement, 'name' | 'description'>;
export type DeleteServiceListElementCommand = Pick<ServiceListElement, 'id'>;
