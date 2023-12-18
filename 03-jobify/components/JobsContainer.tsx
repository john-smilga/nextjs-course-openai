'use client';

import JobsList from './JobsList';
import SearchForm from './SearchForm';
import { useSearchParams } from 'next/navigation';
import { getAllJobsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';

function JobsContainer() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';
  const pageNumber = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search ?? '', jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });

  const jobs = data?.jobs || [];
  const count = data?.count || 0;
  const totalPages = data?.totalPages || 0;
  const page = data?.page || 0;

  return (
    <>
      <SearchForm search={search} jobStatus={jobStatus} />
      <JobsList
        jobs={jobs}
        count={count}
        totalPages={totalPages}
        page={page}
        isPending={isPending}
      />
    </>
  );
}
export default JobsContainer;
