import { Pressable, StyleSheet, ViewStyle, StyleProp, useColorScheme, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import { ThemedText } from './ThemedText'
import { cloneElement, isValidElement } from 'react'

interface ButtonProps {
  size?: 'small' | 'medium' | 'large'
  type?: 'default' | 'primary' | 'danger'
  children?: React.ReactNode
  disabled?: boolean
  onPress?: () => void
  icon?: React.ReactNode
  style?: StyleProp<ViewStyle>
}

const sizeConfig = {
  small: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    fontSize: 14,
    iconSize: 16,
  },
  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    fontSize: 16,
    iconSize: 20,
  },
  large: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    fontSize: 18,
    iconSize: 24,
  }
}

export function Button({
  size = 'medium',
  type = 'default',
  children,
  disabled = false,
  onPress,
  icon,
  style
}: ButtonProps) {
  const theme = useColorScheme();
  const colors = Colors[theme || 'light'];
  const { paddingHorizontal, paddingVertical, fontSize } = sizeConfig[size]

  const getColorConfig = (pressed: boolean) => {
    switch (type) {
      case 'primary':
        return {
          bg: pressed ? colors.primaryDark : colors.primary,
          text: colors.primaryContrast,
          icon: colors.primaryContrast
        }
      case 'danger':
        return {
          bg: pressed ? colors.dangerDark : colors.danger,
          text: colors.dangerContrast,
          icon: colors.dangerContrast
        }
      default:
        return {
          bg: pressed ? colors.backgroundPress : colors.cardBackground,
          text: colors.primary,
          icon: colors.primary
        }
    }
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.baseButton,
        {
          paddingHorizontal,
          paddingVertical,
          borderRadius: 999, // 使用极大值实现胶囊形状
          backgroundColor: getColorConfig(pressed).bg,
          opacity: disabled ? 0.6 : 1
        },
        style
      ]}
    >
      <View style={styles.iconContainer}>
        {icon && isValidElement(icon)
          ? cloneElement(icon, {
            color: getColorConfig(false).icon,
            size: sizeConfig[size].iconSize
          } as any)
          : icon}
      </View>
      {children ? (
        <ThemedText style={{ fontSize, color: getColorConfig(false).text }}>
          {children}
        </ThemedText>
      ) : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 8
  },
  baseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }
})
