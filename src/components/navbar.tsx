import { router, usePathname } from 'expo-router';
import { FC } from 'react';
import { Pressable, View } from 'react-native';

import { ArrowLeft, MoonIcon, SquareIcon } from '@/assets/icons';

type Props = {
  onClick?: () => void;
};

const Navbar: FC<Props> = ({ onClick }) => {
  const routeName = usePathname();

  return (
    <View className="flex flex-row justify-between px-[30px] pt-[70px]">
      {routeName !== '/' ? (
        <>
          <Pressable onPress={() => router.back()} className="flex-1">
            <ArrowLeft strokeColor="#FAFAFA" />
          </Pressable>
          <Pressable onPress={onClick} className="flex-1 items-end">
            <SquareIcon strokeColor={routeName !== '/' ? '#FAFAFA' : '#000000'} />
          </Pressable>
        </>
      ) : (
        <Pressable onPress={() => null} className="flex-1">
          <MoonIcon strokeColor={routeName !== '/' ? '#FAFAFA' : '#000000'} />
        </Pressable>
      )}
    </View>
  );
};

export default Navbar;
