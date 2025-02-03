import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Slider } from '@miblanchard/react-native-slider';
import { SliderOnChangeCallback } from '@miblanchard/react-native-slider/lib/types';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  buffered?: number;
  onValueChange?: SliderOnChangeCallback;
  onSlidingComplete?: SliderOnChangeCallback;
}

export function ProgressBar({
  currentTime,
  duration,
  buffered = 0,
  onValueChange,
  onSlidingComplete,
}: ProgressBarProps) {
  const theme = useColorScheme();
  const { width } = useWindowDimensions();
  const timelineWidth = width - 20 * 2 - 36 * 2;

  // 时间格式化辅助函数
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 计算进度比例
  const progress = duration > 0 ? currentTime / duration : 0;
  const bufferedProgress = duration > 0 ? buffered / duration : 0;
  const colors = Colors[theme || 'light'];

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {/* 时间显示 */}
      <View style={styles.timeContainer}>
        <Text style={[styles.timeText, { color: colors.text }]}>
          {formatTime(currentTime)}
        </Text>
        <Text style={[styles.timeText, { color: colors.subtitle }]}>
          {formatTime(duration)}
        </Text>
      </View>

      {/* 自定义轨道 */}
      <View style={styles.trackContainer}>
        {/* 基础轨道 */}
        <View style={[styles.baseTrack, {
          backgroundColor: colors.progressBarTrack,
          width: timelineWidth,
        }]} />

        {/* 缓冲进度 */}
        <View style={[
          styles.bufferedTrack,
          {
            width: timelineWidth * bufferedProgress,
            backgroundColor: colors.progressBarTrackBuffer
          }
        ]} />

        {/* 播放进度 */}
        <View style={[
          styles.progressTrack,
          {
            width: timelineWidth * progress,
            backgroundColor: colors.progressBarTrackActive
          }
        ]} />
      </View>

      {/* 原生Slider组件 */}
      <Slider
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor={colors.progressBarThumb}
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
        thumbStyle={styles.thumb}
        containerStyle={styles.slider}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    position: 'relative',
  },
  trackContainer: {
    height: 6,
    position: 'absolute',
    top: 7,
    left: 38,
    right: 38,
  },
  baseTrack: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 4,
  },
  bufferedTrack: {
    position: 'absolute',
    height: '100%',
    borderRadius: 4,
    opacity: 0.6,
  },
  progressTrack: {
    position: 'absolute',
    height: '100%',
    borderRadius: 4,
  },
  slider: {
    height: 30,
    position: 'absolute',
    left: 38,
    right: 38,
  },
  thumb: {
    width: 14,
    height: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 1,
    width: '100%',
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
