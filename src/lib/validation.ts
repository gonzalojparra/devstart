import { z } from 'zod';
import { jobTypes, locationTypes } from './job-types';

const requiredString = z.string().min(1, 'Required').max(255);
const numericRequiredString = requiredString.regex(/^\d+$/, 'Must be a number');

const companyLogoSchema = z.custom<File | undefined>()
  .refine(file =>
    !file || (file instanceof File && file.type.startsWith('image/')),
    { message: 'Invalid file type' })
  .refine(file => {
    return !file || file.size < 1024 * 1024 * 2;
  }, { message: 'File size must be less than 2MB' });

const applicationSchema = z.object({
  applicationEmail: z.string().max(100).email().optional().or(z.literal('')),
  applicationUrl: z.string().max(100).url().optional().or(z.literal('')),
})
  .refine(data => data.applicationEmail || data.applicationUrl, {
    message: 'Either email or URL is required',
    path: ['applicationEmail']
  });

const locationSchema = z.object({
  locationType: requiredString
    .refine(value => locationTypes.includes(value), {
      message: 'Invalid location type'
    }),
  location: z.string().max(100).optional()
})
  .refine(data => !data.locationType || data.locationType === 'Remote' || data.location, {
    message: 'Location is required',
    path: ['location']
  });

export const jobSchema = z.object({
  title: requiredString.max(100),
  type: requiredString.refine(
    val => jobTypes.includes(val),
    { message: 'Invalid job type' }),
  company: requiredString.max(100),
  companyLogo: companyLogoSchema,
  description: z.string().max(500).optional(),
  salary: numericRequiredString.max(9, 'Must be less than 10 digits'),
})
  .and(applicationSchema)
  .and(locationSchema);

export type JobValues = z.infer<typeof jobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional()
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;