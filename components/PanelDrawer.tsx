import React from 'react';
import { View, StyleSheet, Text, ScrollView, useColorScheme } from 'react-native';
import { SwipeablePanel, SwipeablePanelProps } from './ui/SwipeablePanel';
import { Colors } from '@/constants/Colors';

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
  const theme = useColorScheme();
  const colors = Colors[theme || 'light'];
  return (
    <SwipeablePanel
      {...panelProps}
      isActive={visible}
      onClose={onClose}
      fullWidth
      noBar={false}
      closeOnTouchOutside
      style={[styles.panelStyle, { backgroundColor: colors.cardBackground }]}
      onlyLarge
    >
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text style={styles.subtitle}>{subTitle}</Text>}
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
    marginBottom: 10,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  rightSlot: {
    alignSelf: 'flex-start',
  },
  scrollContent: {
    borderRadius: 16,
    marginBottom: 22,
  },
});
