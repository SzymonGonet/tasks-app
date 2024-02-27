import moment from 'moment';

import { SquareIcon } from '@/assets/icons';
import { Category } from '@/models/category';

export const categories: Category[] = [
  {
    id: 0,
    title: 'Work',
    icon: <SquareIcon className="h-[48px] w-[48px]" />,
  },
  {
    id: 1,
    title: 'Sports',
    icon: <SquareIcon />,
  },
  {
    id: 2,
    title: 'Food',
    icon: <SquareIcon />,
  },
  {
    id: 3,
    title: 'Music',
    icon: <SquareIcon />,
  },
  {
    id: 4,
    title: 'Study',
    icon: <SquareIcon />,
  },
];

export const formattedDayName = (date: string) =>
  moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
    ? 'Today'
    : moment(date).format('ddd');
