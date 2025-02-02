import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      translation: typeof import('../locales/en').default;
    };
  }
} 