import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanelDrawer } from '@/components/PanelDrawer';
import { Switch } from '@/components/Switch';
import { ThemedText } from '@/components/ThemedText';
import { Tags } from '@/components/Tags';
import Divider from '@/components/Divider';
import { Button } from '@/components/Button';

interface SleepTimerProps {
  visible: boolean;
  onClose: () => void;
  value: string | null;
  enabled: boolean;
  onValueChange: (value: string | null) => void;
  onSwitchChange: (value: boolean) => void;
}

export function SleepTimer({ visible, onClose, value, enabled, onValueChange, onSwitchChange }: SleepTimerProps) {
  const chapterMap = [
    { key: 'chapter-1', value: '当前章' },
    { key: 'chapter-2', value: '播完2章' },
    { key: 'chapter-3', value: '播完3章' },
    { key: 'chapter-4', value: '播完4章' },
    { key: 'chapter-5', value: '播完5章' },
    { key: 'chapter-6', value: '播完6章' },
    { key: 'chapter-7', value: '播完7章' },
    { key: 'chapter-8', value: '播完8章' },
  ];

  const timeMap = [
    { key: 'time-15', value: '15分钟' },
    { key: 'time-30', value: '30分钟' },
    { key: 'time-60', value: '60分钟' },
    { key: 'time-90', value: '90分钟' },
  ];

  const subTitle = value && (
    chapterMap.some(item => item.key === value) ||
    timeMap.some(item => item.key === value)
  ) ? chapterMap.concat(timeMap).find(item => item.key === value)?.value || '' : '';

  const handleSwitchChange = (switchValue: boolean) => {
    onSwitchChange(switchValue);
    if (!switchValue) {
      onValueChange(null);
    }
    if (switchValue && !value) {
      onValueChange(chapterMap[0].key);
    }
  };

  const handleValueChange = (value: string | null) => {
    onValueChange(value);
    if (!value) {
      onSwitchChange(false);
    } else {
      onSwitchChange(true);
    }

  };

  return (
    <PanelDrawer
      title="睡眠定时器"
      subTitle={subTitle}
      visible={visible}
      onClose={onClose}
      rightSlot={
        <Switch
          value={enabled}
          onValueChange={handleSwitchChange}
        />
      }
    >
      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.subtitle}>按章数</ThemedText>
        <Tags
          value={value}
          tags={chapterMap}
          onSelectionChange={handleValueChange}
        />
      </View>
      <Divider />
      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.subtitle}>按时间</ThemedText>
        <Tags
          value={value}
          tags={timeMap}
          onSelectionChange={handleValueChange}
        />
      </View>
      <Divider />
      <Button
        size="small"
        onPress={onClose}
        style={{ margin: 12 }}
      >
        关闭
      </Button>
    </PanelDrawer>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
    marginLeft: 6,
  },
  section: {
    padding: 12,
  },
});
