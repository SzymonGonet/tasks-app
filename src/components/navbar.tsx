import { router, usePathname } from 'expo-router';
import { FC } from 'react';
import { Pressable, View } from 'react-native';

import { ArrowLeft, MoonIcon, PencilIcon } from '@/assets/icons';

const Navbar: FC = () => {
  const routeName = usePathname();

  const addTask = () => null;

  return (
    <View className="flex flex-row justify-between px-[30px] pt-[70px]">
      {routeName !== '/' ? (
        <Pressable onPress={() => router.back()} className="flex-1">
          <ArrowLeft />
        </Pressable>
      ) : (
        <Pressable onPress={() => null} className="flex-1">
          <MoonIcon />
        </Pressable>
      )}
      <Pressable onPress={addTask} className="flex-1 items-end">
        <PencilIcon />
      </Pressable>
    </View>
  );
};

export default Navbar;
