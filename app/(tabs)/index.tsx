import { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import librariesData from '@/mock/libraries.json';
import { Colors } from '@/constants/Colors';
import { CoverItem } from '@/components/book-item/CoverItem';
import RecentAdditionItem from '@/components/book-item/RecentAdditionItem';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const theme = useColorScheme();
  const colors = Colors[theme || 'light'];
  const [isCloudOn, setIsCloudOn] = useState(false);

  const TopBar = () => {
    return (
      <ThemedView style={styles.topBar}>
        <TouchableOpacity style={styles.topBarItem} onPress={() => { /* 处理点击事件 */ }}>
          <Feather name="mic" size={20} color={colors.tint} />
          <Text style={[styles.topBarItemText, { color: colors.tint }]}>小说</Text>
        </TouchableOpacity>
        <View style={styles.topBarItemContainer}>
          <TouchableOpacity style={[styles.topBarItem, { marginRight: 8 }]} onPress={() => setIsCloudOn(!isCloudOn)}>
            {isCloudOn ? (
              <MaterialCommunityIcons name="cloud-outline" size={24} color={colors.tint} />
            ) : (
              <MaterialIcons name="cloud-off" size={24} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBarItem} onPress={() => { /* 处理搜索点击事件 */ }}>
            <Octicons name="search" size={24} color={colors.tint} />
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  };

  const ContinueListening = () => {
    return (
      <ThemedView style={styles.continueListening}>
        <TopBar />
        <ThemedText type="title">继续收听</ThemedText>
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
      <ThemedView style={styles.recentContainer}>
        <ThemedText type="title">最近添加</ThemedText>
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
      headerBackgroundColor={{
        light: Colors['light'].homeHeaderBackground,
        dark: Colors['dark'].homeHeaderBackground
      }}
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
    backgroundColor: Colors['light'].homeHeaderBackground,
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
