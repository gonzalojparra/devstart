import JobPage from '@/components/job-page';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import AdminSidebar from './components/admin-sidebar';

interface PageProps {
  params: { slug: string }
};

export default async function AdminJobPage({ params }: PageProps) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug }
  });

  if (!job) {
    return notFound();
  }

  return (
    <main className='flex m-auto my-10 flex-col items-center md:items-start md:flex-row max-w-5xl space-y-10 px-3'>
      <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
        Admin Dashboard
      </h1>
      <section>
        <h2 className='text-lg font-bold'>Job details:</h2>
        <AdminSidebar job={job} />
        <JobPage job={job} />
      </section>
    </main>
  );
}