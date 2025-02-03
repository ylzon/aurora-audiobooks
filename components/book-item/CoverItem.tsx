import React from 'react';
import { View, Image, StyleSheet, useColorScheme } from 'react-native';
import { PlayButton } from '@/features/player/PlayButton';
import { Colors } from '@/constants/Colors';

interface CoverItemProps {
  imageUrl: string;
  onPlayPress: () => void;
  size?: number;
}

export function CoverItem({ imageUrl, onPlayPress, size = 200 }: CoverItemProps) {
  const theme = useColorScheme();
  const colors = Colors[theme || 'light'];

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <PlayButton onPress={onPlayPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
