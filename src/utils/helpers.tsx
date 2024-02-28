import {
  AcademicCapIcon,
  BriedcaseIcon,
  HomeIcon,
  MusicalNoteIcon,
  TrophyIcon,
} from '@/assets/icons';
import { Category } from '@/models/category';

export const categories: Category[] = [
  {
    id: 0,
    title: 'Work',
    icon: <BriedcaseIcon strokeColor="#7782B3" />,
  },
  {
    id: 1,
    title: 'Study',
    icon: <AcademicCapIcon strokeColor="#7782B3" />,
  },
  {
    id: 2,
    title: 'Home',
    icon: <HomeIcon strokeColor="#7782B3" />,
  },
  {
    id: 3,
    title: 'Sports',
    icon: <TrophyIcon strokeColor="#7782B3" />,
  },
  {
    id: 4,
    title: 'Music',
    icon: <MusicalNoteIcon strokeColor="#7782B3" />,
  },
];
