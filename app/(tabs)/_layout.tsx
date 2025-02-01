import { Tabs } from 'expo-router';
import React, { memo, useEffect } from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView as SafeAreaViewContext } from 'react-native-safe-area-context';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import itemData from '@/mock/items.json';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';

const imgUrl = `http://192.168.31.5:13378/audiobookshelf/api/items/${(itemData as any).id}/cover?ts=${(itemData as any).updatedAt}`;

const TabLayout = memo(() => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const activeColor = Colors[colorScheme ?? 'light'].tint;
  const inactiveColor = Colors[colorScheme ?? 'light'].icon;
  const backgroundColor = Colors[colorScheme ?? 'light'].background;

  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

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
    tabBarActiveTintColor: activeColor,
    tabBarInactiveTintColor: inactiveColor,
    tabBarLabelStyle: {
      fontSize: 12,
      marginBottom: -10,
    },
    tabBarStyle: Platform.select({
      ios: {
        backgroundColor: backgroundColor,
        position: 'absolute'
      },
      default: {
        backgroundColor: backgroundColor,
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
            title: '首页',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: '书库',
            tabBarIcon: ({ color }) => (
              <Ionicons name="library-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="local"
          options={{
            title: '本地',
            tabBarIcon: ({ color }) => (
              <Ionicons name="file-tray-outline" size={24} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="my"
          options={{
            title: '我的',
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" size={24} color="black" />
            ),
          }}
        />
      </Tabs>
      <TouchableOpacity
        style={[styles.playButtonWrapper, {
          backgroundColor: Colors[colorScheme ?? 'light'].tint,
        }]}
        onPress={() => {
          router.push('/play');
        }}>
        <Animated.Image
          source={{ uri: imgUrl }}
          style={[
            styles.coverImage,
            animatedStyles
          ]}
        />
        <MaterialIcons
          name="play-arrow"
          size={30}
          color="white"
          style={styles.playButton}
        />
      </TouchableOpacity>
    </SafeAreaViewContext>
  );
});

const styles = StyleSheet.create({
  playButtonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -25 }],
    borderRadius: 50,
    elevation: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  coverImage: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  playButton: {
  },
});

export default TabLayout;
