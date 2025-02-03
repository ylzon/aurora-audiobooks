import { useState, useCallback } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import searchData from '@/mock/search.json';
import { Colors } from '@/constants/Colors';
import RecentAdditionItem from '@/components/book-item/RecentAdditionItem';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

export default function SearchScreen() {
  const navigation = useNavigation() as NavigationProp<any>;
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useTranslation();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // 这里可以添加实际的搜索逻辑或API调用
  }, []);

  return (
    <ParallaxScrollView
      headerHeight={110}
      fixedHeader
      header={
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="left" size={24} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.searchInput, {
                backgroundColor: colors.background,
                paddingRight: 40,
              }]}
              placeholder={t('search-placeholder')}
              placeholderTextColor={colors.textPlaceholder}
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
            />

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <MaterialIcons
                name="clear"
                size={20}
                color={colors.textPlaceholder}
              />
            </TouchableOpacity>
          </View>
        </View>
      }
    >
      {!searchQuery && (
        <View style={styles.searchContainer}>
          <ThemedText type="title">{t('search-result')} ({searchData.book.length})</ThemedText>
          <FlatList
            data={searchData.book as any}
            keyExtractor={(item) => item.libraryItem.id}
            renderItem={({ item }) => (
              <RecentAdditionItem
                title={item.libraryItem.media.metadata.title}
                authorName={item.libraryItem.media.metadata.authorName}
                narratorName={item.libraryItem.media.metadata.narratorName}
                addedAt={item.libraryItem.addedAt}
                coverUrl={`http://192.168.31.5:13378/audiobookshelf/api/items/${item.libraryItem.id}/cover?ts=${item.libraryItem.updatedAt}`}
              />
            )}
          />
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 10,
    marginTop: 40,
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  searchInput: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    outline: 'none',
  },
  searchContainer: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  deleteText: {
    marginLeft: 16,
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearButton: {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
});
