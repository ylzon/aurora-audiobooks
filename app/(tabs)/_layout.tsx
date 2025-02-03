import { Tabs } from 'expo-router';
import React, { memo, useEffect } from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import itemData from '@/mock/items.json';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/utils/theme';
import { PlayButton } from '@/features/player/PlayButton';

const imgUrl = `http://192.168.31.5:13378/audiobookshelf/api/items/${(itemData as any).id}/cover?ts=${(itemData as any).updatedAt}`;

const TabLayout = memo(() => {
  const colors = useColors()
  const router = useRouter();
  const rotation = useSharedValue(0);
  const { t } = useTranslation();

  useEffect(() => {
    // 匀速旋转
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear
      }),
      -1, // 无限循环
      false
    );
  }, []);

  const screenOptions: BottomTabNavigationOptions = {
    tabBarActiveTintColor: colors.iconActive,
    tabBarInactiveTintColor: colors.icon,
    tabBarLabelStyle: {
      fontSize: 12,
      marginBottom: -10,
    },
    tabBarStyle: Platform.select({
      ios: {
        position: 'absolute'
      },
      default: {
        backgroundColor: colors.backgroundSecondary,
        borderTopColor: colors.backgroundShadow,
        borderTopWidth: 1,
      }
    }),
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarBackground: TabBarBackground,
  }

  return (
    <SafeAreaViewContext
      style={{ flex: 1 }}
      edges={['bottom'] as const}
    >
      <Tabs screenOptions={screenOptions} safeAreaInsets={{ bottom: 4, top: 20 }}>
        <Tabs.Screen
          name="index"
          options={{
            title: t('home'),
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: t('library'),
            tabBarIcon: ({ color }) => (
              <Ionicons name="library-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: '',
            tabBarIcon: () => null,
            tabBarButton: () => null,
          }}
        />
        <Tabs.Screen
          name="local"
          options={{
            title: t('local'),
            tabBarIcon: ({ color }) => (
              <Ionicons name="file-tray-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t('profile'),
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
      <PlayButton
        type="rotato"
        imageUrl={imgUrl}
        onPress={() => router.push('/play')}
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: [{ translateX: -30 }],
        }}
      />
    </SafeAreaViewContext>
  );
});

export default TabLayout;
