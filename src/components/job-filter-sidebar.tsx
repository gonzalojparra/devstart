import { redirect } from 'next/navigation';

import { JobFilterValues, jobFilterSchema } from '@/lib/validation';
import { jobTypes } from '@/lib/job-types';
import prisma from '@/lib/db';

import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

async function filterJobs(formData: FormData) {
  'use server'

  const values = Object.fromEntries(formData.entries()) as Record<string, string>;
  const { q, type, location, remote } = jobFilterSchema.parse(values);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: 'true' })
  });

  redirect(`/jobs?${searchParams.toString()}`);
}

export default async function JobFilterSidebar({
  defaultValues
}: JobFilterSidebarProps) {
  const distinctLocations = (await prisma.job.findMany({
    where: { approved: true },
    select: { location: true },
    distinct: ['location']
  }).then(locations =>
    locations.map(location => location.location).filter(Boolean)
  )) as string[];

  return (
    <aside className='md:w-[260px] p-4 sticky top-0 bg-background h-fit border rounded-lg'>
      <form action={filterJobs}>
        <div className='space-y-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='q'>Search</Label>
            <Input
              id='q'
              name='q'
              placeholder='Title, company, etc'
              defaultValue={defaultValues.q}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='type'>Type</Label>
            <Select name='type' defaultValue={defaultValues.type || ''}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a type' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {jobTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='location'>Location</Label>
            <Select name='location' defaultValue={defaultValues.location || ''}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a location' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {distinctLocations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <Checkbox id='remote' defaultChecked={defaultValues.remote} />
            <Label htmlFor='remote'>Remote jobs</Label>
          </div>
          <Button type='submit' className='w-full'>Filter</Button>
        </div>
      </form>
    </aside>
  )
}