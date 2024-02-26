import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { FC } from 'react';
import { View } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomDrawer: FC = (props: any) => (
  <View className="flex-1">
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
    {/* TODO: add theme swticher */}
  </View>
);

export default CustomDrawer;
