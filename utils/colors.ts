// 改变透明度 HEX -> RGBA
export const changeOpacity = (color: string, opacity: number) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// 在原有颜色基础上加深 HEX -> HEX
export const darken = (color: string, percentage: number) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `#${Math.max(0, Math.min(255, r - (r * percentage))).toString(16).padStart(2, '0')}${Math.max(0, Math.min(255, g - (g * percentage))).toString(16).padStart(2, '0')}${Math.max(0, Math.min(255, b - (b * percentage))).toString(16).padStart(2, '0')}`;
};

// 在原有颜色基础上变浅 HEX -> HEX
export const lighten = (color: string, percentage: number) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `#${Math.min(255, r + (r * percentage)).toString(16).padStart(2, '0')}${Math.min(255, g + (g * percentage)).toString(16).padStart(2, '0')}${Math.min(255, b + (b * percentage)).toString(16).padStart(2, '0')}`;
};
