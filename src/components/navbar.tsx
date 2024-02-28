import { router, usePathname } from 'expo-router';
import { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Iconify } from 'react-native-iconify';

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
            <Iconify icon="heroicons:arrow-left" size={24} color="#FAFAFA" />
          </Pressable>
          <Pressable onPress={onClick} className="flex-1 items-end">
            <Iconify
              icon="heroicons:squares-plus"
              size={24}
              color={routeName !== '/' ? '#FAFAFA' : '#000000'}
            />
          </Pressable>
        </>
      ) : null}
    </View>
  );
};

export default Navbar;
