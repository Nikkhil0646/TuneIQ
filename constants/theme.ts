// constants/theme.ts
import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

export const LightTheme: Theme & { custom: ThemeColors } = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f9f9f9',
    card: '#ffffff',
    text: '#111',
    primary: '#007AFF',
  },
  custom: {
    accent: '#007AFF',
    cardBackground: '#ffffff',
    cardShadow: '#e0e0e0',
    button: '#007AFF',
    buttonText: '#ffffff',
    highlight: '#e0f7fa',
  },
};

export const DarkThemeExtended: Theme & { custom: ThemeColors } = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    card: '#1e1e1e',
    text: '#f1f1f1',
    primary: '#0A84FF',
  },
  custom: {
    accent: '#0A84FF',
    cardBackground: '#1e1e1e',
    cardShadow: '#000000',
    button: '#0A84FF',
    buttonText: '#ffffff',
    highlight: '#263238',
  },
};

export type ThemeColors = {
  accent: string;
  cardBackground: string;
  cardShadow: string;
  button: string;
  buttonText: string;
  highlight: string;
};
