import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Image, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTranslation } from 'react-i18next';
import { PlayButton } from '@/features/player/PlayButton';

interface RecentAdditionItemProps {
  title?: string;
  authorName?: string;
  narratorName?: string;
  addedAt?: string;
  coverUrl?: string;
  onPlayPress?: () => void;
}

const formatDate = (dateString?: string): string => {
  const date = new Date(dateString || Date.now());
  return date.toISOString().split('T')[0]; // 格式化为 YYYY-MM-DD
};

const RecentAdditionItem: React.FC<RecentAdditionItemProps> = ({ title, authorName, narratorName, addedAt, coverUrl, onPlayPress }) => {
  const theme = useColorScheme();
  const colors = Colors[theme || 'light'];
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.container}>
      <Image source={{ uri: coverUrl }} style={styles.coverImage} />
      <View style={styles.infoContainer}>
        <ThemedText style={styles.title}>{title || 'Unknown'}</ThemedText>
        <ThemedText style={styles.author}>{t('author')}: {authorName || 'Unknown'}</ThemedText>
        <ThemedText style={styles.narrator}>{t('narrator')}: {narratorName || 'Unknown'}</ThemedText>
        <ThemedText style={styles.date}>{formatDate(addedAt)}</ThemedText>
      </View>
      <PlayButton onPress={onPlayPress} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  narrator: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});

export default RecentAdditionItem;
