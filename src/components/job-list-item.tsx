import Image from 'next/image';

import { Job } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import {
  Banknote,
  Briefcase,
  Clock,
  Globe2,
  MapPin
} from 'lucide-react';

import { relativeDate, salaryFormatter } from '@/lib/utils';

interface JobListItemProps {
  job: Job;
};

export default function JobListItem({ job }: JobListItemProps) {
  return (
    <article className='flex gap-3 border rounded-lg p-5 hover:bg-muted transition-all'>
      <Image
        src={job.companyLogoUrl || '/company_logo_placeholder.png'}
        alt={job.company}
        width={100}
        height={100}
        className='rounded-lg self-center'
      />
      <div className='flex-grow space-y-3'>
        <div className=''>
          <h2 className='text-xl font-medium'>{job.title}</h2>
          <p className='text-muted-foreground'>{job.company}</p>
        </div>
        <div className='text-muted-foreground'>
          <p className='flex items-center gap-1.5 sm:hidden'>
            <Briefcase size={16} className='shrink-0' />
            {job.type}
          </p>
          <p className='flex items-center gap-1.5'>
            <MapPin size={16} className='shrink-0' />
            {job.locationType}
          </p>
          <p className='flex items-center gap-1.5'>
            <Globe2 size={16} className='shrink-0' />
            {job.location || 'Worldwide'}
          </p>
          <p className='flex items-center gap-1.5'>
            <Banknote size={16} className='shrink-0' />
            {salaryFormatter(job.salary)}
          </p>
          <p className='flex items-center gap-1.5 sm:hidden'>
            <Clock size={16} className='shrink-0' />
            {relativeDate(job.createdAt)}
          </p>
        </div>
      </div>

      <div className='hidden sm:flex flex-col shrink-0 items-end justify-between'>
        <Badge className='mb-2'>{job.type}</Badge>
        <span className='flex items-center gap-1.5 text-muted-foreground'>
          <Clock size={16} className='inline-block mr-1.5' />
          {relativeDate(job.createdAt)}
        </span>
      </div>
    </article>
  )
}