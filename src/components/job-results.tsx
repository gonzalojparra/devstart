import Link from 'next/link';
import { Prisma } from '@prisma/client';

import { JobFilterValues } from '@/lib/validation';
import prisma from '@/lib/db';

import JobListItem from "@/components/job-list-item";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface JobResultsProps {
  filterValues: JobFilterValues,
  page?: number
}

interface PaginationProps {
  currentPage: number,
  totalPages: number,
  filterValues: JobFilterValues
}

export default async function JobResults({
  filterValues,
  page = 1
}: JobResultsProps) {
  const { q, type, location, remote } = filterValues;

  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;

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

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: jobsPerPage,
    skip
  });
  const countPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div className='space-y-4 grow'>
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className='block'>
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className='text-center m-auto'>No jobs found. Try with other filters.</p>
      )}
      {jobs.length > 0 && (
        <PaginationN
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  )
}

function PaginationN({
  currentPage,
  totalPages,
  filterValues: { q, type, location, remote }
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: 'true' }),
      page: page.toString()
    });

    return `/jobs?${searchParams.toString()}`;
  }

  return (
    <div className='flex justify-between'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious href={generatePageLink(currentPage - 1)} />
            ) : (
              <PaginationPrevious href={generatePageLink(currentPage)} />
            )}
          </PaginationItem>
          {/* Render pagination items based on total pages */}
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={generatePageLink(index + 1)}
                isActive={index + 1 === currentPage}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {currentPage < totalPages ? (
              <PaginationNext href={generatePageLink(currentPage + 1)} />
            ) : (
              <PaginationNext href={generatePageLink(currentPage)} />

            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}