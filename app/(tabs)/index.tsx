import { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import librariesData from '@/mock/home.json';
import { Colors } from '@/constants/Colors';
import { CoverItem } from '@/components/book-item/CoverItem';
import RecentAdditionItem from '@/components/book-item/RecentAdditionItem';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/utils/theme';

export default function HomeScreen() {
  const navigation = useNavigation() as NavigationProp<any>;
  const colors = useColors();
  const [isCloudOn, setIsCloudOn] = useState(false);
  const { t } = useTranslation();

  const topBarItemStyle = {
    ...styles.topBarItem,
    backgroundColor: colors.background,
  };

  const TopBar = () => {
    return (
      <ThemedView style={styles.topBar}>
        <TouchableOpacity style={topBarItemStyle} onPress={() => { }}>
          <Feather name="mic" size={20} color={colors.primary} />
          <Text style={[styles.topBarItemText, { color: colors.primary }]}>{t('novel')}</Text>
        </TouchableOpacity>
        <View style={styles.topBarItemContainer}>
          <TouchableOpacity style={[topBarItemStyle, { marginRight: 8 }]} onPress={() => setIsCloudOn(!isCloudOn)}>
            {isCloudOn ? (
              <MaterialCommunityIcons name="cloud-outline" size={24} color={colors.primary} />
            ) : (
              <MaterialIcons name="cloud-off" size={24} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={topBarItemStyle} onPress={() => navigation.navigate('search')}>
            <Octicons name="search" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  };

  const ContinueListening = () => {
    return (
      <ThemedView style={[styles.continueListening, { backgroundColor: colors.backgroundSecondary }]}>
        <TopBar />
        <ThemedText type="title">{t('keep-listening')}</ThemedText>
        <FlatList
          data={librariesData[0].entities as any}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView style={styles.itemContainerHorizontal}>
              <CoverItem
                onPlayPress={() => { }}
                size={150}
                imageUrl={`http://192.168.31.5:13378/audiobookshelf/api/items/${item.id}/cover?ts=${item.updatedAt}`}
              />
            </ThemedView>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ThemedView>
    );
  };

  const RecentAdditions = () => {
    return (
      <ThemedView style={[styles.recentContainer, {
        backgroundColor: colors.background,
      }]}>
        <ThemedText type="title">{t('recent-additions')}</ThemedText>
        <FlatList
          data={librariesData[1].entities as any}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecentAdditionItem
              title={item.media.metadata.title}
              authorName={item.media.metadata.authorName}
              narratorName={item.media.metadata.narratorName}
              addedAt={item.addedAt}
              coverUrl={`http://192.168.31.5:13378/audiobookshelf/api/items/${item.id}/cover?ts=${item.updatedAt}`}
            />
          )}
        />
      </ThemedView>
    );
  };

  return (
    <ParallaxScrollView
      header={
        <ContinueListening />
      }
    >
      <RecentAdditions />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    borderRadius: 20,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 26,
    paddingRight: 20,
  },
  topBarItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    height: 36,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  continueListening: {
    padding: 20,
    paddingRight: 0,
  },
  recentContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainerHorizontal: {
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  itemContainerVertical: {
    marginTop: 12,
    backgroundColor: 'transparent',
  },
});
