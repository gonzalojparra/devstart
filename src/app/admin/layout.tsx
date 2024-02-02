import { ClerkProvider } from '@clerk/nextjs';
import { Metadata } from 'next';

import AdminMenubar from './components/admin-menubar';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin panel for DevStart',
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <AdminMenubar />
      {children}
    </ClerkProvider>
  )
}