/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { FC, useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { TrashIcon } from '@/assets/icons';
import Navbar from '@/components/navbar';
import { Task } from '@/models/task';
import { formattedDayName } from '@/utils/helpers';

const TaskScreen: FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const { categoryId, categoryName, dayName } = params as {
    categoryId: string;
    categoryName: string;
    dayName: string;
  };

  const getTaskKey = () => `taskList_${categoryId}_${dayName}`;

  const saveTaskList = async (updatedTaskList: Task[]) => {
    await SecureStore.setItemAsync(getTaskKey(), JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList);
  };

  const loadTaskList = async () => {
    const storedTaskList = await SecureStore.getItemAsync(getTaskKey());
    if (storedTaskList) {
      setTaskList(JSON.parse(storedTaskList) as Task[]);
    }
  };

  const handleCheck = async (index: number) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].isChecked = !updatedTaskList[index].isChecked;
    await saveTaskList(updatedTaskList);
  };

  const handleDelete = async (index: number) => {
    const remainingTasks = [...taskList];
    remainingTasks.splice(index, 1);
    await saveTaskList(remainingTasks);
  };

  const handleAdd = async () => {
    const newTask: Task = {
      id: taskList.length > 0 ? taskList[taskList.length - 1].id + 1 : 1,
      title: 'New Task',
      isChecked: false,
      categoryId: parseInt(categoryId),
      date: dayName,
    };

    const updatedTaskList = [...taskList, newTask];
    await saveTaskList(updatedTaskList);
  };

  useEffect(() => {
    void loadTaskList();
  }, [categoryId, dayName]);

  return (
    <View style={{ backgroundColor: colors.primary }} className="flex-1">
      <Navbar onClick={handleAdd} />
      <View className="flex flex-col space-y-[5px] px-[30px] pb-[30px] pt-[60px]">
        <Text className="text-[22px] font-medium text-white">{categoryName}</Text>
        <Text className="text-white">{taskList.length} incomplete tasks</Text>
      </View>
      <View className="flex-1 rounded-tl-[40px] bg-white">
        <Text className="px-[30px] pb-[15px] pt-[30px] text-[16px] font-medium">
          {formattedDayName(dayName)}
        </Text>
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
