import { useTheme } from '@react-navigation/native';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface HomeIconProps extends SvgProps {
  strokeColor?: string;
}

export const HomeIcon = ({ strokeColor, ...props }: HomeIconProps) => {
  const { colors } = useTheme();

  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        stroke={strokeColor || colors.notification}
        strokeWidth={1.5}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </Svg>
  );
};
