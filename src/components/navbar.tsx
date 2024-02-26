import { DrawerActions } from '@react-navigation/native';
import { useNavigation, usePathname } from 'expo-router';
import { FC } from 'react';
import { Pressable, View } from 'react-native';

import { BarsIcon, PencilIcon } from '@/assets/icons';

const Navbar: FC = () => {
  const navigation = useNavigation();
  const routeName = usePathname();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const addTask = () => null;

  return (
    <View className="flex flex-row justify-between px-[20px] pt-[60px]">
      <Pressable onPress={toggleDrawer}>
        <BarsIcon />
      </Pressable>
      {routeName !== '/author' && (
        <Pressable onPress={addTask}>
          <PencilIcon />
        </Pressable>
      )}
    </View>
  );
};

export default Navbar;
