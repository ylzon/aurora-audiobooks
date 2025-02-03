import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SwipeablePanel, SwipeablePanelProps } from './ui/SwipeablePanel';
import { useColors } from '@/utils/theme';
import { ThemedText } from './ThemedText';

interface PanelDrawerProps extends Omit<SwipeablePanelProps, 'isActive' | 'children'> {
  title: string;
  subTitle?: string;
  rightSlot?: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function PanelDrawer({
  visible,
  onClose,
  children,
  rightSlot,
  title,
  subTitle,
  ...panelProps
}: PanelDrawerProps) {
  const colors = useColors();
  return (
    <SwipeablePanel
      {...panelProps}
      isActive={visible}
      onClose={onClose}
      fullWidth
      noBar={false}
      closeOnTouchOutside
      style={[styles.panelStyle, { backgroundColor: colors.backgroundSecondary }]}
      onlyLarge
    >
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <ThemedText type='title' style={styles.title}>{title}</ThemedText>
          {subTitle && <ThemedText style={styles.subtitle}>{subTitle}</ThemedText>}
        </View>
        {rightSlot && (
          <View style={styles.rightSlot}>
            {rightSlot}
          </View>
        )}
      </View>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SwipeablePanel>
  );
}

const styles = StyleSheet.create({
  panelStyle: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 16,
  },
  title: {
    marginBottom: 0,
  },
  subtitle: {
    marginLeft: 8,
    marginBottom: 0,
  },
  rightSlot: {
    alignSelf: 'flex-start',
  },
  scrollContent: {
    borderRadius: 16,
    marginBottom: 22,
  },
});
