'use server'

import { currentUser } from '@clerk/nextjs';
import { del } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { User } from '@clerk/nextjs/server';
import { UserResource } from '@clerk/types';

import prisma from '@/lib/db';
import { redirect } from 'next/navigation';

type FormState = {
  error?: string;
} | undefined;

export async function approveSubmission(
  formData: FormData
): Promise<FormState> {
  try {
    const jobId = parseInt(formData.get('jobId') as string);
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error('You are not authorized to perform this action');
    }

    await prisma.job.update({
      where: { id: jobId },
      data: { approved: true },
    });

    revalidatePath('/');
  } catch (error) {
    let message = 'Unexpected error';
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function deleteJob(formData: FormData) {
  try {
    const jobId = parseInt(formData.get('jobId') as string);
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error('You are not authorized to perform this action');
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (job?.companyLogoUrl) {
      await del(job.companyLogoUrl);
    }

    await prisma.job.delete({
      where: { id: jobId }
    });

    revalidatePath('/');
  } catch (error) {
    let message = 'Unexpected error';
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }

  redirect('/admin');
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === 'admin';
}