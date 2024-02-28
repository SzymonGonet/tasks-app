/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { TrashIcon } from '@/assets/icons';
import ModalBox from '@/components/modal-box';
import Navbar from '@/components/navbar';
import { Task } from '@/models/task';

const TaskScreen: FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [timeRange, setTimeRange] = useState({
    startTime: new Date(),
    endTime: new Date(),
  });
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

  const handleToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAdd = async () => {
    const newTask: Task = {
      id: taskList.length > 0 ? taskList[taskList.length - 1].id + 1 : 1,
      title: noteTitle,
      isChecked: false,
      categoryId: parseInt(categoryId),
      date: dayName,
      startTime: timeRange.startTime,
      endTime: timeRange.endTime,
    };

    const updatedTaskList = [...taskList, newTask];
    await saveTaskList(updatedTaskList);
  };

  const formattedDayName = (date: string) =>
    moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? 'Today'
      : moment(date).format('dddd');

  useEffect(() => {
    void loadTaskList();
  }, [categoryId, dayName]);

  return (
    <View style={{ backgroundColor: colors.primary }} className="flex-1">
      <Navbar onClick={handleToggleModal} />
      <View className="flex flex-col space-y-[5px] px-[30px] pb-[30px] pt-[60px]">
        <Text className="text-[22px] font-medium text-white">{categoryName}</Text>
        <Text className="text-white">{taskList.length} incomplete tasks</Text>
      </View>
      <View className="flex-1 rounded-tl-[40px] bg-white">
        <Text className="px-[30px] pb-[15px] pt-[30px] text-[20px] font-medium">
          {formattedDayName(dayName)}
        </Text>
        {taskList.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-[22px] font-medium text-gray-400">Task list is empty! </Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {taskList.map((item, index) => (
              <View
                key={index}
                className="flex flex-row items-center justify-between  px-[30px] py-[20px]">
                <View className="flex flex-row items-center space-x-[24px]">
                  <Pressable onPress={() => handleDelete(index)}>
                    <TrashIcon />
                  </Pressable>
                  <View className="flex flex-col space-y-[4px]">
                    <Text
                      className={`${item.isChecked && 'text-[#7782B3] line-through'} text-[16px] font-medium`}>
                      {item.title}
                    </Text>
                    <Text
                      className={`${item.isChecked ? 'text-[#7782B3] line-through' : 'text-gary-400'} text-[13px] font-medium `}>
                      {moment(item.startTime).format('HH:mm')} -{' '}
                      {moment(item.endTime).format('HH:mm')}
                    </Text>
                  </View>
                </View>
                <Checkbox
                  value={item.isChecked}
                  onValueChange={() => handleCheck(index)}
                  color={item.isChecked ? colors.primary : undefined}
                  className="rounded-[6px]"
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <ModalBox
        isModalVisible={modalVisible}
        label="add task"
        toggleModal={handleToggleModal}
        leftButton="close"
        rightButton="add"
        onPress={handleAdd}
        startTime={timeRange.startTime}
        setStartTime={(time: Date) =>
          setTimeRange(prevState => ({ ...prevState, startTime: time }))
        }
        endTime={timeRange.endTime}
        setEndTime={(time: Date) => setTimeRange(prevState => ({ ...prevState, endTime: time }))}
        handleTextChange={(text: string) => setNoteTitle(text)}
      />
    </View>
  );
};

export default TaskScreen;
