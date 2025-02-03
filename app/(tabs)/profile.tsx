import { StyleSheet, TouchableOpacity, View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getCurrentLanguage, changeLanguage } from '@/utils/i18n';
import { useTheme } from '@/utils/theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MyScreen() {
  const { t } = useTranslation();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  const handleLanguageChange = async (lng: string) => {
    try {
      await changeLanguage(lng);
      setCurrentLang(lng);
    } catch (error) {
      console.error('Language change failed:', error);
    }
  };

  return (
    <ParallaxScrollView
      header={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('profile')}</ThemedText>
        <View>
          <Button
            title="English"
            onPress={() => handleLanguageChange('en')}
            disabled={currentLang === 'en'}
          />
          <Button
            title="中文"
            onPress={() => handleLanguageChange('zh')}
            disabled={currentLang === 'zh'}
          />
        </View>
        <View style={styles.themeContainer}>
          <TouchableOpacity
            onPress={() => setTheme('light')}
            style={[styles.themeButton, resolvedTheme === 'light' && styles.activeTheme]}
          >
            <MaterialIcons
              name="light-mode"
              size={24}
              color={resolvedTheme === 'light' ? '#007AFF' : '#808080'}
            />
            <ThemedText style={styles.themeText}>{t('light')}</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTheme('dark')}
            style={[styles.themeButton, resolvedTheme === 'dark' && styles.activeTheme]}
          >
            <MaterialIcons
              name="dark-mode"
              size={24}
              color={resolvedTheme === 'dark' ? '#007AFF' : '#808080'}
            />
            <ThemedText style={styles.themeText}>{t('dark')}</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTheme('system')}
            style={[styles.themeButton, theme === 'system' && styles.activeTheme]}
          >
            <MaterialIcons
              name="settings"
              size={24}
              color={theme === 'system' ? '#007AFF' : '#808080'}
            />
            <ThemedText style={styles.themeText}>{t('system')}</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  languageButton: {
    marginLeft: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#808080',
  },
  themeContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  themeButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  activeTheme: {
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0,122,255,0.1)',
  },
  themeText: {
    marginTop: 4,
    fontSize: 12,
  },
});
