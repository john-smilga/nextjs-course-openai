import { JobType } from '@/utils/types';
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaBroadcastTower,
} from 'react-icons/fa';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import JobInfo from './JobInfo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJobAction } from '@/utils/actions';
import { useToast } from '@/components/ui/use-toast';

function JobCard({ job }: { job: JobType }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: 'there was an error',
        });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      toast({ description: 'job removed' });
    },
  });

  const date = new Date(job.createdAt).toLocaleDateString();
  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className='mt-4 grid grid-cols-2 gap-4'>
        <JobInfo icon={<FaBriefcase />} text={job.mode} />
        <JobInfo icon={<FaLocationArrow />} text={job.location} />
        <JobInfo icon={<FaCalendarAlt />} text={date} />
        <Badge className='w-32 justify-center'>
          <JobInfo icon={<FaBroadcastTower />} text={job.status} />
        </Badge>
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button asChild size='sm'>
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>
        <Button
          size='sm'
          disabled={isPending}
          onClick={() => {
            mutate(job.id);
          }}
        >
          {isPending ? 'deleting...' : 'delete'}
        </Button>
      </CardFooter>
    </Card>
  );
}
export default JobCard;
