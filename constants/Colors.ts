/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#7B57E4';
const tintColorDark = '#7B57E4';

export const Colors = {
  light: {
    text: '#11181C',
    subtitle: 'rgba(0,0,0,0.6)',
    background: '#fff',
    backgroundRgba: 'rgba(255,255,255,0.6)',
    cardBackground: '#eeecf6',
    bufferBackground: '#7B57E4',
    textPlaceholder: '#999',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // 开关
    switchTrackActive: tintColorLight,
    switchTrackInactive: tintColorDark,
    switchThumb: '#FFFFFF',
    // 标签
    tagBackground: '#eeecf6',
    tagText: '#1a1a1a',
    tagSelectedBackground: tintColorLight,
    tagSelectedText: '#FFFFFF',
    // 分割线
    divider: '#eeecf6',
    // 按钮
    primary: tintColorLight,
    primaryDark: '#0063CC',
    primaryContrast: '#FFFFFF',
    danger: '#FF3B30',
    dangerDark: '#CC2E25',
    dangerContrast: '#FFFFFF',
    backgroundPress: 'rgba(0,0,0,0.1)',
    border: '#D1D1D6'
  },
  dark: {
    text: '#ECEDEE',
    subtitle: 'rgba(255,255,255,0.6)',
    background: '#151718',
    backgroundRgba: 'rgba(21,23,24,0.5)',
    cardBackground: '#eeecf6',
    bufferBackground: '#1d0c5c',
    textPlaceholder: '#999',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // 开关
    switchTrackActive: tintColorDark,
    switchTrackInactive: tintColorDark,
    switchThumb: '#F0F0F0',
    // 标签
    tagBackground: '#eeecf6',
    tagText: '#1a1a1a',
    tagSelectedBackground: tintColorDark,
    tagSelectedText: '#FFFFFF',
    // 分割线
    divider: '#eeecf6',
    // 按钮
    primary: '#0A84FF',
    primaryDark: '#0063CC',
    primaryContrast: '#FFFFFF',
    danger: '#FF453A',
    dangerDark: '#CC2E25',
    dangerContrast: '#FFFFFF',
    backgroundPress: 'rgba(255,255,255,0.1)',
    border: '#48484A'
  },
};
