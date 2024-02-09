import Link from 'next/link';
import {
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';

import { BriefcaseIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className='px-4 lg:px-6 h-14 flex items-center'>
      <Link className='flex items-center justify-center' href='/'>
        <BriefcaseIcon className='h-6 w-6' />
        <span className='sr-only'>DevStart</span>
      </Link>
      <nav className='ml-auto flex gap-4 sm:gap-6 items-center'>
        <Link className='text-sm font-medium hover:underline underline-offset-4' href='/jobs'>
          Jobs
        </Link>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Link className='text-sm font-medium hover:underline underline-offset-4' href='/sign-up'>
            Sign Up
          </Link>
        </SignedOut>

      </nav>
    </header>
  )
}