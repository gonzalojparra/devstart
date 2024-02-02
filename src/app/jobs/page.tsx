import { JobFilterValues } from '@/lib/validation'

import JobFilterSidebar from "@/components/job-filter-sidebar";
import JobResults from "@/components/job-results";

interface PageProps {
  searchParams: {
    q?: string,
    type?: string,
    location?: string,
    remote?: string,
    page?: string
  }
}

export default async function JobsPage({
  searchParams: {
    q,
    type,
    location,
    remote,
    page
  }
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === 'true'
  };

  return (
    <main className='max-w-5xl m-auto px-3 my-10 space-y-10'>
      <div className='space-y-5 text-center'>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>Developer jobs</h1>
        <p className='text-muted-foreground'>Find your first job.</p>
      </div>
      <section className='flex flex-col md:flex-row gap-4'>
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
