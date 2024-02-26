import { useTheme } from '@react-navigation/native';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface ListBulletIconProps extends SvgProps {
  strokeColor?: string;
}

export const BarsIcon = ({ strokeColor, ...props }: ListBulletIconProps) => {
  const { colors } = useTheme();

  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        stroke={strokeColor || colors.notification}
        strokeWidth={1.5}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 9h16.5m-16.5 6.75h16.5"
      />
    </Svg>
  );
};
