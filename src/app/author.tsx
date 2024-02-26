import { FC } from 'react';
import { Text, View } from 'react-native';

import Navbar from '@/components/navbar';

const HomeScreen: FC = () => (
  <View className="flex-1 space-y-[150px] bg-red-400">
    <Navbar />
    <View className="flex flex-1 flex-row items-center justify-center rounded-t-[20px] bg-white">
      <Text>Author: Szymon Gonet</Text>
    </View>
  </View>
);

export default HomeScreen;
