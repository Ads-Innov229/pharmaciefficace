import { Outlet } from 'react-router-dom';
import { AuthenticatedLayout } from './AuthenticatedLayout';

export function MainLayout() {
  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 w-full overflow-hidden">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px]">
            <div className="w-full mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}