/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#7B57E4';
const tintColorDark = '#7B57E4';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    backgroundRgba: 'rgba(255,255,255,0.6)',
    homeHeaderBackground: 'rgba(124, 109, 188, 0.13)',
    bufferBackground: '#7B57E4',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    backgroundRgba: 'rgba(21,23,24,0.5)',
    homeHeaderBackground: 'rgba(124, 109, 188, 0.13)',
    bufferBackground: '#1d0c5c',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
