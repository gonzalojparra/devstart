import Image from "next/image";

import prisma from '@/lib/db';
import JobListItem from "@/components/job-list-item";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main>
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
    </main>
  );
}
