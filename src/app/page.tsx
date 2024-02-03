import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { CardContent, Card } from '@/components/ui/card';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1'>
        <section className='w-full py-2 md:py-5 lg:py-7 xl:py-14'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 text-center lg:text-left'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Connect with your first job opportunity
                </h1>
                <p className='mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  We help trainee and junior developers find their first job. Start your career with us.
                </p>
              </div>
              <div className='w-full max-w-md lg:max-w-lg'>
                <Image
                  src='/assets/get-started.png'
                  alt='Hero'
                  className='w-[90%] h-[90%] object-contain transition-all duration-300 ease-in-out transform hover:rotate-6'
                  height={500}
                  width={500}
                  quality={100}
                />
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block border-transparent bg-primary text-primary-foreground hover:bg-primary/80 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
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
              <Card className='transition-all hover:scale-105'>
                <CardContent className='flex flex-col items-center space-y-4'>
                  <img
                    alt='Profile'
                    className='w-24 h-24 mt-5 rounded-full'
                    height='100'
                    src='/assets/people-01.png'
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
              <Card className='transition-all hover:scale-105'>
                <CardContent className='flex flex-col items-center space-y-4'>
                  <img
                    alt='Profile'
                    className='w-24 h-24 mt-5 rounded-full'
                    height='100'
                    src='/assets/people-02.png'
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
              <Card className='transition-all hover:scale-105'>
                <CardContent className='flex flex-col items-center space-y-4'>
                  <img
                    alt='Profile'
                    className='w-24 h-24 mt-5 rounded-full'
                    height='100'
                    src='/assets/people-03.png'
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
