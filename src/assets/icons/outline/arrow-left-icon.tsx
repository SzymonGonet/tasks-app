import { useTheme } from '@react-navigation/native';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface ArrowLeftIconProps extends SvgProps {
  strokeColor?: string;
}

export const ArrowLeft = ({ strokeColor, ...props }: ArrowLeftIconProps) => {
  const { colors } = useTheme();

  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        stroke={strokeColor || colors.notification}
        strokeWidth={1.5}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </Svg>
  );
};
