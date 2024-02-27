import moment from 'moment';
import { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  date: string;
  selectedDate: string;
  isSelectedDate: (date: string) => void;
};

const Date: FC<Props> = ({ date, selectedDate, isSelectedDate }) => {
  const day =
    moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
      ? 'Today'
      : moment(date).format('ddd');

  const dayNumber = moment(date).format('D');
  const fullDate = moment(date).format('YYYY-MM-DD');

  return (
    <TouchableOpacity
      onPress={() => isSelectedDate(fullDate)}
      className={`mx-[10px] my-[10px] flex h-[90px] w-[80px] flex-col items-center justify-center rounded-[16px] bg-gray-100 p-[15px] shadow-sm ${selectedDate === fullDate && 'bg-[#7782B3]'}`}>
      <Text className={`text-[18px] ${selectedDate === fullDate && 'text-white'}`}>{day}</Text>
      <View style={{ height: 10 }} />
      <Text className={`text-[14px] ${selectedDate === fullDate && 'text-white'}`}>
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default Date;
