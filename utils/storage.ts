import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

let memoryStorage: Record<string, string> = {};

export const getStorageItem = async (key: string): Promise<string | null> => {
  // 优先从内存缓存读取
  if (memoryStorage[key]) {
    return memoryStorage[key];
  }

  try {
    let value: string | null;
    if (Platform.OS === 'web') {
      value = localStorage.getItem(key);
    } else {
      value = await SecureStore.getItemAsync(key);
    }

    if (value) {
      memoryStorage[key] = value;
    }
    return value;
  } catch (error) {
    console.error('Storage get error:', error);
    return null;
  }
};

export const setStorageItem = async (key: string, value: string): Promise<void> => {
  try {
    memoryStorage[key] = value;
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error('Storage set error:', error);
    throw error;
  }
};

export const removeStorageItem = async (key: string): Promise<void> => {
  try {
    delete memoryStorage[key];
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error('Storage remove error:', error);
    throw error;
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    memoryStorage = {};
    if (Platform.OS === 'web') {
      localStorage.clear();
    } else {
      await SecureStore.deleteItemAsync('user-language'); // 根据实际需要调整
    }
  } catch (error) {
    console.error('Storage clear error:', error);
    throw error;
  }
};
