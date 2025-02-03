import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useColors } from '@/utils/theme';

interface PlayButtonProps {
  type?: 'default' | 'rotato';
  onPress?: () => void;
  style?: ViewStyle;
  imageUrl?: string;
}

export function PlayButton({
  type = 'default',
  onPress,
  style,
  imageUrl,
}: PlayButtonProps) {
  const colors = useColors();
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    if (type === 'rotato') {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 3000,
          easing: Easing.linear
        }),
        -1,
        false
      );
    }
  }, [type]);

  return (
    <TouchableOpacity
      style={[
        styles.playButton,
        type === 'default' && {
          backgroundColor: colors.backgroundTertiary,
        },
        type === 'rotato' && [
          styles.rotatoWrapper,
          {
            backgroundColor: colors.primary,
            shadowColor: colors.backgroundShadow,
          }
        ],
        style,
      ]}
      onPress={onPress}
    >
      {type === 'default' ? (
        <Feather
          name="play"
          size={24}
          color={colors.primary}
          style={styles.playButtonIcon}
        />
      ) : (
        <>
          {imageUrl && (
            <Animated.Image
              source={{ uri: imageUrl }}
              style={[
                styles.coverImage,
                animatedStyles
              ]}
            />
          )}
          <MaterialIcons
            name="play-arrow"
            size={30}
            color={colors.primary}
            style={styles.rotatoPlayIcon}
          />
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  playButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  playButtonIcon: {
    marginLeft: 4,
  },
  rotatoWrapper: {
    borderRadius: 60,
    elevation: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  coverImage: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
  },
  rotatoPlayIcon: {
    position: 'relative',
    zIndex: 1,
  },
});
