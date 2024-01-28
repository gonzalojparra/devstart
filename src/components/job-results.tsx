import { Prisma } from '@prisma/client';

import { JobFilterValues } from '@/lib/validation';
import prisma from '@/lib/db';

import JobListItem from "@/components/job-list-item";

interface JobResultsProps {
  filterValues: JobFilterValues
}

export default async function JobResults({
  filterValues: { q, type, location, remote }
}: JobResultsProps) {
  const searchString = q
    ?.split(' ')
    .filter(word => word.length > 0)
    .join(' & ');

  const searchFilter: Prisma.JobWhereInput = searchString ?
    {
      OR: [
        { title: { search: searchString } },
        { description: { search: searchString } },
        { company: { search: searchString } },
        { type: { search: searchString } },
        { location: { search: searchString } },
      ]
    } : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      { ...searchFilter },
      type ? { type: { equals: type } } : {},
      location ? { location: { equals: location } } : {},
      remote ? { locationType: 'Remote' } : {},
      { approved: true }
    ]
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className='space-y-4 grow'>
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
      {jobs.length === 0 && (
        <p className='text-center m-auto'>No jobs found. Try with other filters.</p>
      )}
    </div>
  )
}