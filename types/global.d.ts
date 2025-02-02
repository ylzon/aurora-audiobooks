declare namespace NodeJS {
  interface Global {
    localStorage: {
      getItem: (key: string) => string | null;
      setItem: (key: string, value: string) => void;
    };
  }
} 