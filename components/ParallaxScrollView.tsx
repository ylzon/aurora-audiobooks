import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColors } from '@/utils/theme';

type Props = PropsWithChildren<{
  header?: ReactElement;
  headerHeight?: number;
  fixedHeader?: boolean;
}>;

export default function ParallaxScrollView({
  children,
  header,
  headerHeight = 310,
  fixedHeader = false,
}: Props) {
  const colors = useColors();
  const scrollRef = useAnimatedRef<any>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (fixedHeader) {
      return { transform: [] };
    }

    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-headerHeight, 0, headerHeight], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      {fixedHeader && (
        <Animated.View
          style={[
            styles.fixedHeader,
            {
              backgroundColor: colors.backgroundSecondary,
              height: headerHeight
            }
          ]}>
          {header}
        </Animated.View>
      )}

      <Animated.FlatList<any>
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{
          paddingTop: fixedHeader ? headerHeight : 0,
          paddingBottom: bottom,
          flexGrow: 1
        }}
        ListHeaderComponent={!fixedHeader ? (
          <Animated.View
            style={[
              styles.header,
              {
                backgroundColor: colors.backgroundSecondary,
                height: headerHeight
              },
              headerAnimatedStyle,
            ]}>
            {header}
          </Animated.View>
        ) : null}
        data={[1]}
        renderItem={() => (
          <ThemedView style={[styles.content, {
            backgroundColor: colors.background,
          }]}>
            {children}
          </ThemedView>
        )}
        keyExtractor={() => 'parallax-content'}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    gap: 16,
    overflow: 'hidden',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    overflow: 'hidden',
  },
});
