import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: '/add-job',
    label: 'add job',
    icon: <FaWpforms />,
  },
  {
    href: '/jobs',
    label: 'all jobs',
    icon: <MdQueryStats />,
  },
  {
    href: '/stats',
    label: 'stats',
    icon: <IoBarChartSharp />,
  },
];

export default links;
