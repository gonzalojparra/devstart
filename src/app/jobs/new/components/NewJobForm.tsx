'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { draftToMarkdown } from 'markdown-draft-js';

import { jobTypes, locationTypes } from '@/lib/job-types';
import { JobValues, jobSchema } from '@/lib/validation';

import { AddJobButton } from '@/components/shared/FormSubmitButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LocationInput from './location-input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Wysiwyg from '@/components/ui/wysiwyg';

import { X } from 'lucide-react';
import { createJobPost } from '../actions';

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
    setFocus,
    formState: { isSubmitting }
  } = form;

  async function onSubmit(values: JobValues) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createJobPost(formData);
    } catch (error) {
      alert('Something went wrong');
    }
  }

  return (
    <main className='max-w-3xl m-auto my-10 space-y-10'>
      <div className=''>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Find your perfect developer
        </h1>
        <p className='text-muted-foreground pt-3'>Get your job posting seen by thousands of job seekers.</p>
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
            <FormField
              control={control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue=''>
                      <SelectTrigger>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='company'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='companyLogo'
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Company logo</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='locationType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue=''
                      /* onChange={(e) => {
                        field.onChange(e);
                        if (e.currentTarget.value === 'Remote') {
                          trigger('location');
                        }
                      }} */
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a location type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {locationTypes.map(locationType => (
                            <SelectItem key={locationType} value={locationType}>
                              {locationType}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office location</FormLabel>
                  <FormControl>
                    <LocationInput onLocationSelected={field.onChange} ref={field.ref} />
                  </FormControl>
                  {watch('location') && (
                    <div className='flex items-center gap-1'>
                      <button
                        type='button'
                        onClick={() => {
                          setValue('location', '', { shouldValidate: true })
                        }}
                      >
                        <X size={20} />
                      </button>
                      <span className='text-sm'>{watch('location')}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='space-y-2'>
              <Label htmlFor='applicationEmail'>How to apply</Label>
              <div className='flex justify-between'>
                <FormField
                  control={control}
                  name='applicationEmail'
                  render={({ field }) => (
                    <FormItem className='grow'>
                      <FormControl>
                        <div className='flex items-center'>
                          <Input
                            id='applicationEmail'
                            placeholder='Email'
                            type='email'
                            {...field}
                          />
                          <span className='mx-2'>or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name='applicationUrl'
                  render={({ field }) => (
                    <FormItem className='grow'>
                      <FormControl>
                        <Input
                          placeholder='Website'
                          type='url'
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger('applicationEmail');
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus('description')}>Description</Label>
                  <FormControl>
                    <Wysiwyg
                      onChange={draft => field.onChange(draftToMarkdown(draft))}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='salary'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AddJobButton type='submit' loading={isSubmitting}>
              Submit
            </AddJobButton>
          </form>
        </Form>
      </div>
    </main>
  )
}
