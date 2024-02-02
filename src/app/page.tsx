import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { CardContent, Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl text-primary font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Connect with your first job opportunity
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  We help trainee and junior developers find their first job. Start your career with us.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800'>
                  Success Stories
                </div>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Developers who found their first job
                </h2>
                <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  Hear from developers who kickstarted their career with DevStart.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12'>
              <Card>
                <CardContent className='flex flex-col items-center space-y-4'>
                  <img
                    alt='Profile'
                    className='w-24 h-24 mt-5 rounded-full'
                    height='100'
                    src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    style={{
                      aspectRatio: '100/100',
                      objectFit: 'cover',
                    }}
                    width='100'
                  />
                  <h3 className='text-xl font-bold'>John Doe</h3>
                  <p className='text-center text-gray-500 dark:text-gray-400'>
                    "DevStart helped me land my first job as a Frontend Developer. The process was smooth and easy."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='flex flex-col items-center space-y-4'>
                  <img
                    alt='Profile'
                    className='w-24 h-24 mt-5 rounded-full'
                    height='100'
                    src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    style={{
                      aspectRatio: '100/100',
                      objectFit: 'cover',
                    }}
                    width='100'
                  />
                  <h3 className='text-xl font-bold'>Jane Smith</h3>
                  <p className='text-center text-gray-500 dark:text-gray-400'>
                    "I found my first job as a Backend Developer through DevStart. The support was amazing."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='flex flex-col items-center space-y-4'>
                  <img
                    alt='Profile'
                    className='w-24 h-24 mt-5 rounded-full'
                    height='100'
                    src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    style={{
                      aspectRatio: '100/100',
                      objectFit: 'cover',
                    }}
                    width='100'
                  />
                  <h3 className='text-xl font-bold'>Alex Johnson</h3>
                  <p className='text-center text-gray-500 dark:text-gray-400'>
                    "DevStart connected me with my current job as a Full Stack Developer. I couldn't be happier."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>Ready to find your first job?</h2>
              <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                Sign up now and start connecting with companies looking for trainee and junior developers.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row md:justify-end justify-center'>
              <Link href='/sign-up'>
                <Button className='w-full'>Sign Up</Button>
              </Link>
              <Link href='#'>
                <Button className='w-full' variant='ghost'>Download App</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
