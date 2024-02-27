import { useTheme } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { TrashIcon } from '@/assets/icons';
import Navbar from '@/components/navbar';
import { Task } from '@/models/task';

const TaskScreen: FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const { category, dayName } = params;

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

  const handleDelete = async (index: number) => {
    const remainingTasks = [...taskList];
    remainingTasks.splice(index, 1);
    setTaskList([...remainingTasks]);
    await SecureStore.setItemAsync('taskList', JSON.stringify(remainingTasks));
  };

  const handleAdd = async () => {
    const storedTaskList = await SecureStore.getItemAsync('taskList');
    const existingTasks = storedTaskList ? (JSON.parse(storedTaskList) as Task[]) : [];

    existingTasks.push({
      title: 'New Task',
      isChecked: false,
      id: 0,
    });

    await SecureStore.setItemAsync('taskList', JSON.stringify(existingTasks));
    setTaskList(existingTasks);
  };

  const day =
    moment(dayName).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? 'Today'
      : moment(dayName).format('dddd');

  return (
    <View style={{ backgroundColor: colors.primary }} className="flex-1">
      <Navbar onClick={handleAdd} />
      <View className="flex flex-col space-y-[5px] px-[30px] pb-[30px] pt-[60px]">
        <Text className="text-[22px] font-medium text-white">{category}</Text>
        <Text className="text-white">{taskList.length} incomplete tasks</Text>
      </View>
      <View className="flex-1 rounded-tl-[40px] bg-white">
        <Text className="px-[30px] pb-[15px] pt-[30px] text-[16px] font-medium">{day}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {taskList.map((item, index) => (
            <View
              key={index}
              className="flex flex-row items-center space-x-[15px] px-[30px] py-[20px]">
              <Checkbox
                value={item.isChecked}
                onValueChange={() => handleCheck(index)}
                color={item.isChecked ? colors.primary : undefined}
                className="rounded-[6px]"
              />
              <View className="flex flex-col space-y-[5px]">
                <Text className={`${item.isChecked && 'line-through'} text-[17px]`}>
                  {item.title}
                </Text>
                <Text className="text-[13px] text-gray-400">16:00 - 18:00</Text>
              </View>
              <Pressable onPress={() => handleDelete(index)} className="flex-1 items-end">
                <TrashIcon />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default TaskScreen;
