/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { changeOpacity } from "@/utils/colors";

const common = {
  danger: '#FF3B30',
  white: '#FFFFFF',
  dark: '#1b1d21',
  grey: '#808190',
  green: '#8cb880',
  lightGrey: '#3d3e43',
}

// light
const light = {
  primary: '#7B57E4',
  secondary: '#174cbf',
  accent: '#edecf5',
}


// dark
const dark = {
  primary: '#a388ff',
  secondary: '#174cbf',
  accent: '#252730',
}

export const Colors = {
  light: {
    ...common,
    ...light,

    // Background
    background: common.white,
    backgroundSecondary: light.accent,
    backgroundTertiary: changeOpacity(light.accent, 0.7),
    backgroundShadow: changeOpacity(common.dark, 0.3),

    // Text
    title: common.dark,
    subtitle: changeOpacity(common.dark, 0.8),
    description: common.grey,
    text: common.dark,
    link: light.primary,
    textPlaceholder: changeOpacity(common.dark, 0.5),

    // Icon
    icon: common.grey,
    iconActive: light.primary,

    // ProgressBar
    progressBarThumb: light.primary,
    progressBarTrack: changeOpacity(common.white, 0.2),
    progressBarTrackBuffer: changeOpacity(common.white, 0.3),
    progressBarTrackActive: light.primary,

    // Switch
    switchTrackActive: light.primary,
    switchTrackInactive: common.grey,
    switchThumb: common.white,

    // Tags
    tagBackground: light.accent,
    tagText: common.dark,
    tagSelectedBackground: light.primary,
    tagSelectedText: common.white,

    // Divider
    divider: light.accent,

    // Button
    buttonBackground: light.accent,
    buttonText: light.primary,
    buttonDisabledBackground: changeOpacity(light.accent, 0.5),
    buttonDisabledText: changeOpacity(light.primary, 0.5),
    buttonPrimaryBackground: light.primary,
    buttonPrimaryText: common.white,
    buttonPrimaryDisabledBackground: changeOpacity(light.primary, 0.5),
    buttonPrimaryDisabledText: changeOpacity(common.white, 0.5),
    buttonDangerBackground: common.danger,
    buttonDangerText: common.white,
    buttonDangerDisabledBackground: changeOpacity(common.danger, 0.5),
    buttonDangerDisabledText: changeOpacity(common.white, 0.5),
    buttonSuccessBackground: common.green,
    buttonSuccessText: common.white,
    buttonSuccessDisabledBackground: changeOpacity(common.green, 0.5),
    buttonSuccessDisabledText: changeOpacity(common.white, 0.5),
  },
  dark: {
    ...common,
    ...dark,

    // Background
    background: common.dark,
    backgroundSecondary: dark.accent,
    backgroundTertiary: changeOpacity(dark.accent, 0.7),
    backgroundShadow: changeOpacity(common.dark, 0.3),

    // Text
    title: common.white,
    subtitle: changeOpacity(common.white, 0.8),
    description: changeOpacity(common.white, 0.4),
    text: common.white,
    link: dark.primary,
    textPlaceholder: changeOpacity(common.white, 0.5),

    // Icon
    icon: common.grey,
    iconActive: dark.primary,

    // ProgressBar
    progressBarThumb: dark.primary,
    progressBarTrack: changeOpacity(common.white, 0.2),
    progressBarTrackBuffer: changeOpacity(common.white, 0.3),
    progressBarTrackActive: dark.primary,

    // Switch
    switchTrackActive: dark.primary,
    switchTrackInactive: common.lightGrey,
    switchThumb: common.white,

    // Tags
    tagBackground: dark.accent,
    tagText: common.white,
    tagSelectedBackground: dark.primary,
    tagSelectedText: common.white,

    // Divider
    divider: dark.accent,

    // Button
    buttonBackground: dark.accent,
    buttonText: dark.primary,
    buttonDisabledBackground: changeOpacity(dark.accent, 0.5),
    buttonDisabledText: changeOpacity(dark.primary, 0.5),
    buttonPrimaryBackground: dark.primary,
    buttonPrimaryText: common.white,
    buttonPrimaryDisabledBackground: changeOpacity(dark.primary, 0.5),
    buttonPrimaryDisabledText: changeOpacity(common.white, 0.5),
    buttonDangerBackground: common.danger,
    buttonDangerText: common.white,
    buttonDangerDisabledBackground: changeOpacity(common.danger, 0.5),
    buttonDangerDisabledText: changeOpacity(common.white, 0.5),
    buttonSuccessBackground: common.green,
    buttonSuccessText: common.white,
    buttonSuccessDisabledBackground: changeOpacity(common.green, 0.5),
    buttonSuccessDisabledText: changeOpacity(common.white, 0.5),
  },
};
