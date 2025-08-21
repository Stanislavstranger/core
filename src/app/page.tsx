import { TestButton } from '@/components/ui/test-button';
import { CreateServiceForm } from '@/features/services-list/pub/create-service-form';
import { ServiceList } from '@/features/services-list/pub/services-list';

export default async function Home() {
  return (
    <main className="flex min-h-screen max-w-100 flex-col p-8">
      <TestButton />
      <h1 className="text-3xl font-bold mb-10">Список сервисов</h1>
      <CreateServiceForm revalidatePagePath="/" className="max-w-[300px] mb-5" />
      <ServiceList revalidatePagePath="/" />
    </main>
  );
}
