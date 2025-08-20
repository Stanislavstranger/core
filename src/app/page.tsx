import { CreateServiceForm } from '@/features/services-list/pub/create-service-form';
import { ServiceList } from '@/features/services-list/pub/services-list';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <h1 className="text-3xl font-bold">Список сервисов</h1>
      <CreateServiceForm revalidatePagePath="/" className="max-w-[300px] mb-5" />
      <ServiceList revalidatePagePath="/" />
    </main>
  );
}
