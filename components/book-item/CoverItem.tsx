import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
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
      <TouchableOpacity style={styles.playButton} onPress={onPlayPress}>
        <Feather name="play" size={24} color={colors.tint} />
      </TouchableOpacity>
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
  playButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, // 按钮宽度
    height: 50, // 按钮高度
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // 可选：按钮背景色
    borderRadius: 25, // 圆形按钮
  },
});
