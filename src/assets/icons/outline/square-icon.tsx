import { useTheme } from '@react-navigation/native';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface SquareIconIconProps extends SvgProps {
  strokeColor?: string;
}

export const SquareIcon = ({ strokeColor, ...props }: SquareIconIconProps) => {
  const { colors } = useTheme();

  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        stroke={strokeColor || colors.notification}
        strokeWidth={1.5}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </Svg>
  );
};
