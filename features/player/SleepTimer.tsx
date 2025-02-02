import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanelDrawer } from '@/components/PanelDrawer';
import { Switch } from '@/components/Switch';
import { ThemedText } from '@/components/ThemedText';
import { Tags } from '@/components/Tags';
import Divider from '@/components/Divider';
import { Button } from '@/components/Button';
import { useTranslation } from 'react-i18next';
interface SleepTimerProps {
  visible: boolean;
  onClose: () => void;
  value: string | null;
  enabled: boolean;
  onValueChange: (value: string | null) => void;
  onSwitchChange: (value: boolean) => void;
  setSleepTimerText: (value: string | null) => void;
}

export function SleepTimer({ visible, onClose, value, enabled, onValueChange, onSwitchChange, setSleepTimerText }: SleepTimerProps) {
  const { t } = useTranslation();
  const chapterMap = [
    { key: 'chapter-1', value: t('current-chapter') },
    { key: 'chapter-2', value: t('finish-2-chapters') },
    { key: 'chapter-3', value: t('finish-3-chapters') },
    { key: 'chapter-4', value: t('finish-4-chapters') },
    { key: 'chapter-5', value: t('finish-5-chapters') },
    { key: 'chapter-6', value: t('finish-6-chapters') },
    { key: 'chapter-7', value: t('finish-7-chapters') },
    { key: 'chapter-8', value: t('finish-8-chapters') },
  ];

  const timeMap = [
    { key: 'time-15', value: t('15-minutes') },
    { key: 'time-30', value: t('30-minutes') },
    { key: 'time-60', value: t('60-minutes') },
    { key: 'time-90', value: t('90-minutes') },
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
    setSleepTimerText(chapterMap.find(item => item.key === value)?.value || timeMap.find(item => item.key === value)?.value || '');
  };

  return (
    <PanelDrawer
      title={t('sleep-timer')}
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
        <ThemedText type="subtitle" style={styles.subtitle}>{t('by-chapter')}</ThemedText>
        <Tags
          value={value}
          tags={chapterMap}
          onSelectionChange={handleValueChange}
        />
      </View>
      <Divider />
      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.subtitle}>{t('by-time')}</ThemedText>
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
        {t('close')}
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
