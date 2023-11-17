'use client';
import { deleteTask } from '@/utils/actions';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className='btn btn-xs btn-error' disabled={pending}>
      {pending ? 'pending...' : 'delete'}
    </button>
  );
};

const DeleteForm = ({ id }) => {
  return (
    <form action={deleteTask}>
      <input type='hidden' name='id' value={id} />
      <SubmitButton />
    </form>
  );
};
export default DeleteForm;
