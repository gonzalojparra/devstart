import Link from 'next/link';

import { BriefcaseIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className='px-4 lg:px-6 h-14 flex items-center'>
      <Link className='flex items-center justify-center' href='/'>
        <BriefcaseIcon className='h-6 w-6' />
        <span className='sr-only'>DevStart</span>
      </Link>
      <nav className='ml-auto flex gap-4 sm:gap-6'>
        <Link className='text-sm font-medium hover:underline underline-offset-4' href='/jobs'>
          Jobs
        </Link>
        <Link className='text-sm font-medium hover:underline underline-offset-4' href='/sign-up'>
          Sign Up
        </Link>
      </nav>
    </header>
  )
}