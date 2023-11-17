'use client';

import { getAllTours } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import ToursList from './ToursList';
import { useState } from 'react';

const ToursPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, isPending } = useQuery({
    queryKey: ['tours', searchValue],
    queryFn: () => getAllTours(searchValue),
  });
  return (
    <>
      <form className='max-w-lg mb-12'>
        <div className='join w-full'>
          <input
            type='text'
            placeholder='enter city or country here...'
            className='input input-bordered join-item w-full'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button
            className='btn btn-primary join-item'
            type='button'
            disabled={isPending}
            onClick={() => setSearchValue('')}
          >
            {isPending ? 'please wait...' : 'reset'}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className='loading'></span>
      ) : (
        <ToursList data={data} />
      )}
    </>
  );
};
export default ToursPage;
