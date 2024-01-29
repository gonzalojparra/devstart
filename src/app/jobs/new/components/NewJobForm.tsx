'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { JobValues, jobSchema } from '@/lib/validation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function NewJobForm() {
  const form = useForm<JobValues>({
    resolver: zodResolver(jobSchema)
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    formState: { isSubmitting }
  } = form;

  async function onSubmit(values: JobValues) {
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <main className='max-w-3xl m-auto my-10 space-y-10'>
      <div className=''>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Find your perfect developer
        </h1>
        <p className='text-muted-foreground'>Get your job posting seen by thousands of job seekers.</p>
      </div>
      <div className='space-y-6 border rounded-lg p-4'>
        <div className=''>
          <h2 className='font-semibold'>Job details</h2>
          <p className='text-muted-foreground'>Provide a job description and details</p>
        </div>
        <Form {...form}>
          <form
            className='space-y-4'
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. Frontend Developer' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </main>
  )
}
