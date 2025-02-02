import { View, ViewStyle, StyleSheet, useColorScheme, DimensionValue } from 'react-native';
import { Colors } from '../constants/Colors';

export interface DividerProps {
  direction?: 'horizontal' | 'vertical';
  thickness?: number;
  margin?: DimensionValue;
  style?: ViewStyle;
}

export default function Divider({
  direction = 'horizontal',
  thickness = StyleSheet.hairlineWidth,
  margin = 0,
  style
}: DividerProps) {
  const theme = useColorScheme();
  const colors = Colors[theme || 'light'];
  const baseStyle: ViewStyle = direction === 'horizontal'
    ? styles.horizontal
    : styles.vertical;

  const dynamicStyle: ViewStyle = {
    backgroundColor: colors.divider,
    [direction === 'horizontal' ? 'height' : 'width']: thickness,
    [direction === 'horizontal' ? 'marginVertical' : 'marginHorizontal']: margin,
  };

  return <View style={[baseStyle, dynamicStyle, style]} />;
}

const styles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
  vertical: {
    height: '100%',
  },
});
