'use client'

import { useFormState } from 'react-dom';

import { approveSubmission } from '@/app/admin/actions';
import { Job } from '@prisma/client';

import { FormSubmitButton } from '@/components/shared/FormSubmitButton';
import { Input } from '@/components/ui/input';

interface AdminSidebarProps {
  job: Job;
}

export default function AdminSidebar({ job }: AdminSidebarProps) {
  return (
    <aside className='flex w-[200px] flex-none flex-row md:flex-col items-center gap-2 md:items-stretch'>
      {job.approved ? (
        <span className='text-center font-semibold text-primary'>Approved</span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
    </aside>
  )
}

interface AdminButtonProps {
  jobId: number
}

function ApproveSubmissionButton({ jobId }: AdminButtonProps) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);

  return (
    <form action={formAction} className='space-y-1'>
      <Input hidden name='jobId' value={jobId} />
      <FormSubmitButton className='w-full bg-primary'>Approve</FormSubmitButton>
      {formState?.error && (
        <p className='text-sm text-destructive'>{formState.error}</p>
      )}
    </form>
  )
}