import DateTimePicker from '@react-native-community/datetimepicker';
import React, { FC } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  isModalVisible: boolean;
  label: string;
  leftButton?: string;
  rightButton?: string;
  startTime: Date;
  endTime: Date;
  setStartTime: (time: Date) => void;
  setEndTime: (time: Date) => void;
  toggleModal: () => void;
  onPress?: () => void;
  handleTextChange: (text: string) => void;
};

const ModalBox: FC<Props> = ({
  isModalVisible,
  label,
  leftButton,
  rightButton,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  toggleModal,
  onPress,
  handleTextChange,
}) => (
  <Modal
    isVisible={isModalVisible}
    animationInTiming={400}
    animationOutTiming={400}
    backdropTransitionOutTiming={0}
    hideModalContentWhileAnimating={true}
    useNativeDriver={true}>
    <View className="justify-between space-y-[40px] rounded-3xl bg-white p-8">
      <View className="space-y-[26px]">
        <Text className="text-center text-[20px] font-medium uppercase text-[#7782B3]">
          {label}
        </Text>
        <TextInput
          onChangeText={handleTextChange}
          placeholder="Enter task title"
          className="text-medium rounded-[16px] border border-gray-300 px-[10px] py-[14px]"
        />
        <View className="flex flex-row space-x-[12px]">
          <View className="flex flex-1 flex-row items-center">
            <Text className="text-[18px] font-medium">Start:</Text>
            <DateTimePicker
              value={startTime}
              onChange={(_, selectedTime) => {
                setStartTime(selectedTime || startTime);
              }}
              mode="time"
            />
          </View>
          <View className="flex flex-1 flex-row items-center">
            <Text className="text-[18px] font-medium">End:</Text>
            <DateTimePicker
              value={endTime}
              onChange={(_, selectedTime) => {
                setEndTime(selectedTime || endTime);
              }}
              mode="time"
            />
          </View>
        </View>
      </View>
      <View className="flex flex-row space-x-[12px]">
        <Pressable
          className="flex-1 items-center rounded-[16px] border border-gray-300 bg-gray-300 py-3"
          onPress={toggleModal}>
          <Text className="text-[16px] font-medium uppercase text-white">{leftButton}</Text>
        </Pressable>
        <Pressable
          className="flex-1 items-center rounded-[16px] border border-[#7782B3] bg-[#7782B3] py-3"
          onPress={onPress}>
          <Text className="text-[16px] font-medium uppercase text-white">{rightButton}</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

export default ModalBox;
