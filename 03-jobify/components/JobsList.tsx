'use client';

import JobCard from './JobCard';

import ComplexButtonContainer from './ComplexButtonContainer';
import { JobType } from '@/utils/types';
type JobsListProps = {
  jobs: JobType[];
  count: number;
  totalPages: number;
  page: number;
  isPending: boolean;
};

function JobsList({ jobs, count, totalPages, page, isPending }: JobsListProps) {
  if (isPending) return <h2 className='text-xl'>Please Wait...</h2>;

  if (jobs.length < 1) return <h2 className='text-xl'>No Jobs Found...</h2>;
  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-semibold capitalize '>
          {count} jobs found
        </h2>
        {totalPages < 2 ? null : (
          <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>
      <div className='grid md:grid-cols-2  gap-8'>
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
      </div>
    </>
  );
}
export default JobsList;
