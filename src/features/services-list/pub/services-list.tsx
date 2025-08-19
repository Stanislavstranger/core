import { revalidatePath } from 'next/cache';
import { servicesRepository } from '../services.repository';
import { ServiceItem } from '../ui/service-item';

export async function ServiceList({ revalidatePagePath }: { revalidatePagePath: string }) {
  const servicesList = await servicesRepository.getServicesList();

  const handleDeleteAction = async (serviceId: string) => {
    'use server';

    await servicesRepository.deleteServiceElement({ id: serviceId });
    revalidatePath(revalidatePagePath);
  };

  return (
    <div className="flex flex-col gap-3">
      {servicesList.map((service) => (
        <ServiceItem
          key={service.id}
          service={service}
          onDeleteAction={handleDeleteAction.bind(null, service.id)}
        />
      ))}
    </div>
  );
}
