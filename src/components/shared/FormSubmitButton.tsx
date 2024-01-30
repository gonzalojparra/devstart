'use client'

import React from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';

interface AddJobButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean
}

export function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type='submit' disabled={props.disabled || pending}>
      <span className='flex items-center justify-center gap-1'>
        {pending && <Loader2 size={16} className='animate-spin' />}
        {props.children}
      </span>
    </Button>
  )
}

export function AddJobButton({
  children,
  loading,
  ...props
}: AddJobButtonProps) {
  return (
    <Button {...props} type='submit' disabled={props.disabled || loading}>
      <span className='flex items-center justify-center gap-1'>
        {loading && <Loader2 size={16} className='animate-spin' />}
        {children}
      </span>
    </Button>
  )
}