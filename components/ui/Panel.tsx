import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  PanResponder,
  ScrollViewProps,
  BackHandler,
} from 'react-native';

const FULL_HEIGHT = Dimensions.get('window').height;
const FULL_WIDTH = Dimensions.get('window').width;
const PANEL_HEIGHT = FULL_HEIGHT - 100;

const STATUS = {
  CLOSED: 0,
  SMALL: 1,
  LARGE: 2,
};

interface SwipeablePanelProps {
  isActive: boolean; // 是否显示
  onClose: () => void; // 关闭回调
  fullWidth?: boolean; // 是否全屏宽度
  noBackgroundOpacity?: boolean; // 是否不显示背景透明度
  style?: object; // 样式
  closeOnTouchOutside?: boolean; // 是否关闭时触摸外部
  onlyLarge?: boolean; // 是否只显示大面板
  onlySmall?: boolean; // 是否只显示小面板
  openLarge?: boolean; // 是否打开大面板
  smallPanelHeight?: number; // 小面板高度
  noBar?: boolean; // 是否不显示条
  barStyle?: object; // 条样式
  barContainerStyle?: object; // 条容器样式
  allowTouchOutside?: boolean; // 是否允许触摸外部
  scrollViewProps?: ScrollViewProps; // 滚动视图属性
  children?: React.ReactNode; // 子组件
}

const SwipeablePanel = ({
  isActive: propIsActive,
  onClose,
  fullWidth,
  noBackgroundOpacity,
  style,
  closeOnTouchOutside,
  onlyLarge,
  onlySmall,
  openLarge,
  smallPanelHeight,
  noBar,
  barStyle,
  barContainerStyle,
  allowTouchOutside,
  scrollViewProps,
  children,
}: SwipeablePanelProps) => {
  const [status, setStatus] = useState(STATUS.CLOSED);
  const [showComponent, setShowComponent] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    FULL_HEIGHT >= FULL_WIDTH ? 'portrait' : 'landscape'
  );
  const [deviceDimensions, setDeviceDimensions] = useState({
    width: FULL_WIDTH,
    height: FULL_HEIGHT,
    panelHeight: PANEL_HEIGHT,
  });

  const pan: any = useRef(new Animated.ValueXY({ x: 0, y: FULL_HEIGHT })).current;
  const animatedValueY = useRef(0);

  const getPanelHeight = useCallback((height: number) => height - 100, []);

  const handleOrientationChange = useCallback(() => {
    const { height, width } = Dimensions.get('screen');
    const newOrientation = height >= width ? 'portrait' : 'landscape';
    setDeviceDimensions({
      width,
      height,
      panelHeight: getPanelHeight(height),
    });
    setOrientation(newOrientation);
    onClose();
  }, [onClose, getPanelHeight]);

  const animateTo = useCallback((newStatus = STATUS.CLOSED) => {
    let newY = PANEL_HEIGHT;

    if (newStatus === STATUS.SMALL) {
      newY = orientation === 'portrait'
        ? deviceDimensions.height - (smallPanelHeight ?? 400)
        : deviceDimensions.height / 3;
    } else if (newStatus === STATUS.LARGE) {
      newY = 0;
    }

    setShowComponent(true);
    setStatus(newStatus);

    Animated.spring(pan, {
      toValue: { x: 0, y: newY },
      tension: 80,
      friction: 25,
      useNativeDriver: true,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    }).start(() => {
      if (newStatus === STATUS.CLOSED) {
        onClose();
        setShowComponent(false);
      } else {
        setCanScroll(newStatus === STATUS.LARGE);
      }
    });
  }, [pan, orientation, deviceDimensions, smallPanelHeight, onClose]);

  const handleClosePress = useCallback(() => {
    if (status === STATUS.LARGE && !onlyLarge) {
      animateTo(STATUS.SMALL);
    } else if (status === STATUS.SMALL && !onlySmall) {
      animateTo(STATUS.CLOSED);
    } else {
      onClose();
    }
  }, [status, onlyLarge, onlySmall, animateTo, onClose]);

  useEffect(() => {
    const panListener = pan.y.addListener((value: { value: number }) => {
      animatedValueY.current = value.value;
    });

    const dimensionsSubscription = Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      pan.y.removeListener(panListener);
      dimensionsSubscription.remove();
    };
  }, [handleOrientationChange, pan.y]);

  useEffect(() => {
    if (onlyLarge && onlySmall) {
      console.warn(
        'Ops. You are using both onlyLarge and onlySmall options. onlySmall will override the onlyLarge in this situation. Please select one of them or none.'
      );
    }

    if (propIsActive) {
      const targetStatus = onlySmall
        ? STATUS.SMALL
        : openLarge
          ? STATUS.LARGE
          : onlyLarge
            ? STATUS.LARGE
            : STATUS.SMALL;
      animateTo(targetStatus);
    } else {
      animateTo(STATUS.CLOSED);
    }
  }, [propIsActive, animateTo, onlyLarge, onlySmall, openLarge]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (propIsActive) {
          onClose();
          return true; // 阻止默认返回行为
        }
        return false; // 继续默认行为
      }
    );

    return () => backHandler.remove();
  }, [propIsActive, onClose]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: 0,
          y: animatedValueY.current,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue({
            x: 0,
            y: gestureState.dy,
          });
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        // 如果手势状态的dy为0，则保持当前状态
        if (gestureState.dy < -100 || gestureState.vy < -0.5) {
          const targetStatus = status === STATUS.SMALL
            ? onlySmall ? STATUS.SMALL : STATUS.LARGE
            : STATUS.LARGE;
          animateTo(targetStatus);
          // 如果手势状态的dy大于100，或者手势状态的vy大于0.5，则切换到大面板
        } else if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          const targetStatus = status === STATUS.LARGE
            ? onlyLarge ? STATUS.CLOSED : STATUS.SMALL
            : STATUS.CLOSED;
          animateTo(targetStatus);
        } else {
          animateTo(status);
        }
      },
    })
  ).current;

  if (!showComponent) return null;

  return (
    <Animated.View
      style={[
        styles.background,
        {
          backgroundColor: noBackgroundOpacity ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.5)',
          height: allowTouchOutside ? 'auto' : deviceDimensions.height,
          width: deviceDimensions.width,
        },
      ]}
    >
      {closeOnTouchOutside && (
        <TouchableWithoutFeedback onPress={handleClosePress}>
          <View
            style={[
              styles.background,
              {
                width: deviceDimensions.width,
                backgroundColor: 'rgba(0,0,0,0)',
                height: allowTouchOutside ? 'auto' : deviceDimensions.height,
              },
            ]}
          />
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        style={[
          styles.panel,
          {
            width: fullWidth ? deviceDimensions.width : deviceDimensions.width - 50,
            height: 'auto',
          },
          { transform: pan.getTranslateTransform() },
          style,
        ]}
        {...panResponder.panHandlers}
      >
        {!noBar && (
          <View style={[styles.barContainer, barContainerStyle]}>
            <View style={[styles.bar, barStyle]} />
          </View>
        )}
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}
          scrollEnabled={canScroll}
          {...scrollViewProps}
        >
          {canScroll ? (
            <TouchableHighlight>
              <>{children}</>
            </TouchableHighlight>
          ) : (
            children
          )}
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  panel: {
    position: 'absolute',
    width: FULL_WIDTH - 50,
    transform: [{ translateY: FULL_HEIGHT - 100 }],
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    zIndex: 2,
  },
  scrollViewContentContainerStyle: {
    width: '100%',
  },
  barContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: '10%',
    height: 5,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#e2e2e2',
  },
});

const SMALL_PANEL_CONTENT_HEIGHT = PANEL_HEIGHT - (FULL_HEIGHT - 400) - 25;
const LARGE_PANEL_CONTENT_HEIGHT = PANEL_HEIGHT - 25;

export { SwipeablePanel, LARGE_PANEL_CONTENT_HEIGHT, SMALL_PANEL_CONTENT_HEIGHT };
export type { SwipeablePanelProps };