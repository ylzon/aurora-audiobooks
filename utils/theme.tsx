import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { getStorageItem, setStorageItem } from './storage';
import { createContext, useContext, useState } from 'react';
import { Colors } from '@/constants/Colors';

type Theme = 'light' | 'dark' | 'system';
export type ThemeContextType = {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme() || 'light';
  const [theme, setTheme] = useState<Theme>('light');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(systemTheme);

  // 从存储中加载主题设置
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await getStorageItem('theme');
        if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
          setTheme(storedTheme as Theme);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };
    loadTheme();
  }, []);

  // 解析实际应用的主题
  useEffect(() => {
    const newResolvedTheme = theme === 'system' ? systemTheme : theme;
    setResolvedTheme(newResolvedTheme);
    // 可以在这里添加主题应用逻辑，比如更新CSS变量等
  }, [theme, systemTheme]);

  const handleSetTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    try {
      await setStorageItem('theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export const useColors = () => {
  const { resolvedTheme } = useTheme();
  return Colors[resolvedTheme];
};
