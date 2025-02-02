import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {
  const { t } = useTranslation();
  return (
    <View>
      <Stack.Screen options={{ title: t('not-found') }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">{t('not-found')}</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">{t('go-to-home-screen')}</ThemedText>
        </Link>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
