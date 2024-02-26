import { useTheme } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import * as SecureStore from 'expo-secure-store';
import { FC, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Navbar from '@/components/navbar';

type Task = {
  id: number;
  title: string;
  isChecked: boolean;
};

const tasks: Task[] = [
  { id: 0, title: 'Task 1', isChecked: false },
  { id: 1, title: 'Task 2', isChecked: false },
  { id: 2, title: 'Task 3', isChecked: false },
  { id: 3, title: 'Task 4', isChecked: false },
];

const HomeScreen: FC = () => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const { colors } = useTheme();

  useEffect(() => {
    void loadTaskList();
  }, []);

  const loadTaskList = async () => {
    const storedTaskList = await SecureStore.getItemAsync('taskList');
    if (storedTaskList) {
      setTaskList(JSON.parse(storedTaskList) as Task[]);
    }
  };

  const handleCheck = async (index: number) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].isChecked = !updatedTaskList[index].isChecked;
    setTaskList(updatedTaskList);
    await SecureStore.setItemAsync('taskList', JSON.stringify(updatedTaskList));
  };

  return (
    <View className="flex-1 space-y-[150px] bg-red-400">
      <Navbar />
      <ScrollView showsVerticalScrollIndicator={false} className="rounded-t-[20px] bg-white">
        {taskList.map((item, index) => (
          <View
            key={index}
            className="flex flex-row items-center space-x-[15px] border-b-[1px] border-gray-300 px-[20px] py-[30px]">
            <Checkbox
              value={item.isChecked}
              onValueChange={() => handleCheck(index)}
              color={item.isChecked ? colors.border : undefined}
              className="rounded-[6px]"
            />
            <Text className={`${item.isChecked && 'line-through'}`}>{item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
