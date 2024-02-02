'use server'

import { nanoid } from 'nanoid';
import path from 'path';
import { put } from '@vercel/blob';
import { redirect } from 'next/navigation';

import { jobSchema } from '@/lib/validation';
import prisma from '@/lib/db';
import { toSlug } from '@/lib/utils';

export async function createJobPost(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const {
    title,
    type,
    company,
    companyLogo,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary
  } = jobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;
  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: 'public',
        addRandomSuffix: false,
      }
    )
    companyLogoUrl = blob.url;
  }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      company: company.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
    }
  })

  redirect('/job-submitted');
}