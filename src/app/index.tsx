import { useRouter } from 'expo-router';
import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import Date from '@/components/date';
import Navbar from '@/components/navbar';
import { categories } from '@/utils/helpers';

const HomeScreen: FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const router = useRouter();

  const getDates = () => {
    const _dates: string[] = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, 'days').format('YYYY-MM-DD');
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  return (
    <View className="flex-1">
      <Navbar />
      <View className="pt-[40px]">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="px-[20px]">
          {dates.map((item, index) => (
            <Date
              key={index}
              date={item}
              selectedDate={selectedDate}
              isSelectedDate={setSelectedDate}
            />
          ))}
        </ScrollView>
      </View>
      <View className="flex-1 pt-[40px]">
        <Text className="px-[30px] pb-[20px] text-[18px] font-medium uppercase">
          choose activity
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
          <View className="flex w-full flex-col space-y-[25px] px-[30px] pt-[10px]">
            {categories.map((item, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  router.push({
                    pathname: '/tasks',
                    params: { category: item.title, dayName: selectedDate },
                  })
                }
                className="flex flex-row items-center space-x-[20px] rounded-[16px] bg-white p-[30px] shadow-md">
                {item.icon}
                <Text className="text-[18px] font-medium">{item.title}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
