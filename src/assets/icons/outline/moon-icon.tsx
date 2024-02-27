import { useTheme } from '@react-navigation/native';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface MoonIconProps extends SvgProps {
  strokeColor?: string;
}

export const MoonIcon = ({ strokeColor, ...props }: MoonIconProps) => {
  const { colors } = useTheme();

  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        stroke={strokeColor || colors.notification}
        strokeWidth={1.5}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </Svg>
  );
};
