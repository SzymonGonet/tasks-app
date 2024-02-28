import { Iconify } from 'react-native-iconify';

import { Category } from '@/models/category';

export const categories: Category[] = [
  {
    id: 0,
    title: 'Work',
    icon: <Iconify icon="heroicons:briefcase" size={48} color="#7782B3" />,
  },
  {
    id: 1,
    title: 'Study',
    icon: <Iconify icon="heroicons:academic-cap" size={48} color="#7782B3" />,
  },
  {
    id: 2,
    title: 'Home',
    icon: <Iconify icon="heroicons:home" size={48} color="#7782B3" />,
  },
  {
    id: 3,
    title: 'Sports',
    icon: <Iconify icon="heroicons:trophy" size={48} color="#7782B3" />,
  },
  {
    id: 4,
    title: 'Music',
    icon: <Iconify icon="heroicons:musical-note" size={48} color="#7782B3" />,
  },
];
