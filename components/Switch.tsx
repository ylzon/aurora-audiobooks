import { useColors } from '@/utils/theme';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface SwitchProps {
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  activeText?: string;
  inActiveText?: string;
  backgroundActive?: string;
  backgroundInactive?: string;
  value?: boolean;
  circleActiveColor?: string;
  circleInActiveColor?: string;
  circleSize?: number;
  circleBorderActiveColor?: string;
  circleBorderInactiveColor?: string;
  activeTextStyle?: TextStyle;
  inactiveTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  barHeight?: number;
  circleBorderWidth?: number;
  innerCircleStyle?: ViewStyle;
  renderInsideCircle?: () => React.ReactNode;
  changeValueImmediately?: boolean;
  outerCircleStyle?: ViewStyle;
  renderActiveText?: boolean;
  renderInActiveText?: boolean;
  switchLeftPx?: number;
  switchRightPx?: number;
  switchWidthMultiplier?: number;
  switchBorderRadius?: number;
  testID?: string;
}

export const Switch = (props: SwitchProps) => {
  const colors = useColors();
  const {
    onValueChange = () => { },
    disabled = false,
    activeText = '',
    inActiveText = '',
    activeTextStyle,
    inactiveTextStyle,
    containerStyle,
    backgroundActive = colors.switchTrackActive,
    backgroundInactive = colors.switchTrackInactive,
    value: propValue = false,
    circleActiveColor = colors.switchThumb,
    circleInActiveColor = colors.switchThumb,
    circleBorderActiveColor = colors.switchTrackActive,
    circleBorderInactiveColor = colors.switchTrackInactive,
    circleSize = 24,
    barHeight,
    circleBorderWidth = 2,
    changeValueImmediately = true,
    innerCircleStyle = { alignItems: 'center', justifyContent: 'center' },
    outerCircleStyle = {},
    renderActiveText = true,
    renderInActiveText = true,
    switchLeftPx = 2,
    switchRightPx = 2,
    switchWidthMultiplier = 2,
    switchBorderRadius,
    renderInsideCircle = () => null,
    ...restProps
  } = props;
  const [internalValue, setInternalValue] = useState(propValue);
  const [transformSwitch] = useState(
    new Animated.Value(
      propValue
        ? circleSize / switchLeftPx
        : -circleSize / switchRightPx
    )
  );
  const [backgroundColor] = useState(new Animated.Value(propValue ? 75 : -75));
  const [circleColor] = useState(new Animated.Value(propValue ? 75 : -75));
  const [circleBorderColor] = useState(new Animated.Value(propValue ? 75 : -75));

  useEffect(() => {
    if (propValue !== internalValue) {
      animateSwitch(propValue);
      setInternalValue(propValue);
    }
  }, [propValue]);

  const animateSwitch = useCallback((value: boolean, cb?: () => void) => {
    Animated.parallel([
      Animated.spring(transformSwitch, {
        toValue: value
          ? circleSize / switchLeftPx
          : -circleSize / switchRightPx,
        useNativeDriver: false,
      }),
      Animated.timing(backgroundColor, {
        toValue: value ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleColor, {
        toValue: value ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(circleBorderColor, {
        toValue: value ? 75 : -75,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(cb);
  }, [circleSize, switchLeftPx, switchRightPx]);

  const handleSwitch = useCallback(() => {
    if (disabled) return;

    const newValue = !internalValue;
    onValueChange(newValue);

    if (changeValueImmediately) {
      animateSwitch(newValue);
      setInternalValue(newValue);
    } else {
      animateSwitch(newValue, () => setInternalValue(newValue));
    }
  }, [internalValue, disabled, changeValueImmediately, animateSwitch, onValueChange]);

  const interpolatedColorAnimation = backgroundColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [backgroundInactive, backgroundActive],
  });

  const interpolatedCircleColor = circleColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [circleInActiveColor, circleActiveColor],
  });

  const interpolatedCircleBorderColor = circleBorderColor.interpolate({
    inputRange: [-75, 75],
    outputRange: [circleBorderInactiveColor, circleBorderActiveColor],
  });

  return (
    <TouchableWithoutFeedback onPress={handleSwitch} {...restProps}>
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          {
            backgroundColor: interpolatedColorAnimation,
            width: circleSize * switchWidthMultiplier + 2.5,
            height: (barHeight || circleSize) + 2,
            borderRadius: switchBorderRadius || circleSize,
            borderWidth: 1,
            borderColor: colors.divider,
            marginRight: 2,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              left: transformSwitch,
              width: circleSize * switchWidthMultiplier,
            },
            outerCircleStyle,
          ]}
        >
          {internalValue && renderActiveText && (
            <Text style={[styles.text, styles.paddingRight, activeTextStyle]}>
              {activeText}
            </Text>
          )}

          <Animated.View
            style={[
              styles.circle,
              {
                borderWidth: circleBorderWidth,
                borderColor: interpolatedCircleBorderColor,
                backgroundColor: interpolatedCircleColor,
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
                shadowColor: colors.backgroundShadow,
                elevation: 2,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              },
              innerCircleStyle,
            ]}
          >
            {renderInsideCircle()}
          </Animated.View>

          {!internalValue && renderInActiveText && (
            <Text style={[styles.text, styles.paddingLeft, inactiveTextStyle]}>
              {inActiveText}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 78,
    height: 30,
    borderRadius: 30,
  },
  animatedContainer: {
    flex: 1,
    width: 78,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    backgroundColor: 'transparent',
  },
  paddingRight: {
    paddingRight: 5,
  },
  paddingLeft: {
    paddingLeft: 5,
  },
});

