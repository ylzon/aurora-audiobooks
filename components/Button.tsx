import { Pressable, StyleSheet, ViewStyle, StyleProp, View } from 'react-native'
import { ThemedText } from './ThemedText'
import { cloneElement, isValidElement } from 'react'
import { useColors } from '@/utils/theme'

interface ButtonProps {
  size?: 'small' | 'medium' | 'large'
  type?: 'default' | 'primary' | 'danger' | 'success'
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
  const colors = useColors();
  const { paddingHorizontal, paddingVertical, fontSize } = sizeConfig[size]

  const getColorConfig = (pressed: boolean, isDisabled: boolean) => {
    if (isDisabled) {
      switch (type) {
        case 'primary':
          return {
            bg: colors.buttonPrimaryDisabledBackground,
            text: colors.buttonPrimaryDisabledText,
            icon: colors.buttonPrimaryDisabledText
          }
        case 'danger':
          return {
            bg: colors.buttonDangerDisabledBackground,
            text: colors.buttonDangerDisabledText,
            icon: colors.buttonDangerDisabledText
          }
        case 'success':
          return {
            bg: colors.buttonSuccessDisabledBackground,
            text: colors.buttonSuccessDisabledText,
            icon: colors.buttonSuccessDisabledText
          }
        default:
          return {
            bg: colors.buttonDisabledBackground,
            text: colors.buttonDisabledText,
            icon: colors.buttonDisabledText
          }
      }
    }

    switch (type) {
      case 'primary':
        return {
          bg: pressed ? colors.buttonPrimaryDisabledBackground : colors.buttonPrimaryBackground,
          text: colors.buttonPrimaryText,
          icon: colors.buttonPrimaryText
        }
      case 'danger':
        return {
          bg: pressed ? colors.buttonDangerDisabledBackground : colors.buttonDangerBackground,
          text: colors.buttonDangerText,
          icon: colors.buttonDangerText
        }
      case 'success':
        return {
          bg: pressed ? colors.buttonSuccessDisabledBackground : colors.buttonSuccessBackground,
          text: colors.buttonSuccessText,
          icon: colors.buttonSuccessText
        }
      default:
        return {
          bg: pressed ? colors.buttonDisabledBackground : colors.buttonBackground,
          text: colors.buttonText,
          icon: colors.buttonText
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
          backgroundColor: getColorConfig(pressed, disabled).bg,
          opacity: disabled ? 0.6 : 1
        },
        style
      ]}
    >
      <View style={styles.iconContainer}>
        {icon && isValidElement(icon)
          ? cloneElement(icon, {
            color: getColorConfig(false, disabled).icon,
            size: sizeConfig[size].iconSize
          } as any)
          : icon}
      </View>
      {children ? (
        <ThemedText style={{
          fontSize,
          color: getColorConfig(false, disabled).text,
          opacity: disabled ? 0.7 : 1
        }}>
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
