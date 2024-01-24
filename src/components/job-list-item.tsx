import Image from 'next/image';

import { Job } from '@prisma/client';

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
      </div>
    </article>
  )
}