export type Task = {
  id: number;
  title: string;
  isChecked: boolean;
  categoryId: number;
  date: string;
  startTime: Date;
  endTime: Date;
};
