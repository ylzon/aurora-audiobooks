import { Text, type TextProps, StyleSheet } from 'react-native';
import { useColors } from '@/utils/theme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const colors = useColors();

  return (
    <Text
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'title' ? { ...styles.title, color: colors.title } : undefined,
        type === 'subtitle' ? { ...styles.subtitle, color: colors.subtitle } : undefined,
        type === 'link' ? { ...styles.link, color: colors.link } : undefined,
        style,
        { color: colors.text },
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    // 字间距
    letterSpacing: 1,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 2,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
