import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import prisma from '@/lib/db';
import { jobTypes } from '@/lib/job-types';
import { Checkbox } from './ui/checkbox';

async function filterJobs(formData: FormData) {
  'use server'
}

export default async function JobFilterSidebar() {
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
            <Input id='q' name='q' placeholder='Title, company, etc' />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='type'>Type</Label>
            <Select name='type'>
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
            <Select name='location'>
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
            <Checkbox id='remote' />
            <Label htmlFor='remote'>Remote jobs</Label>
          </div>
        </div>
      </form>
    </aside>
  )
}