import { ReactNode, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import type { NavigationProp } from '@react-navigation/native';

interface AnimatePageProps {
  children: ReactNode;
  navigation?: NavigationProp<ReactNavigation.RootParamList> | NavigationProp<any>;
}

export function AnimatePage({ children, navigation }: AnimatePageProps) {
  const internalNav = useNavigation();
  const actualNavigation = navigation || internalNav;
  const translateY = useSharedValue(1000);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    flex: 1
  }));

  const ANIMATION_CONFIG = {
    duration: 400,
    easing: Easing.out(Easing.cubic),
  };

  const startExitAnimation = (callback?: () => void) => {
    translateY.value = withTiming(
      1000,
      {
        ...ANIMATION_CONFIG,
        duration: 300,
      },
      (finished) => {
        if (finished && callback) {
          runOnJS(callback)();
        }
      }
    );
    opacity.value = withTiming(0, { duration: 200 });
  };

  useEffect(() => {
    const unsubscribeBeforeRemove = actualNavigation.addListener(
      'beforeRemove',
      (e: any) => {
        e.preventDefault();
        startExitAnimation(() => {
          actualNavigation.dispatch(e.data.action);
        });
      }
    );

    const unsubscribeTransitionStart = actualNavigation.addListener(
      'transitionStart' as never,
      (e: any) => {
        if (e.data.closing) {
          startExitAnimation();
        }
      }
    );

    translateY.value = withTiming(0, ANIMATION_CONFIG);
    opacity.value = withTiming(1, { duration: 300 });

    return () => {
      unsubscribeBeforeRemove();
      unsubscribeTransitionStart();
    };
  }, [actualNavigation]);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
} 