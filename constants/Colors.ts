const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const noteColors: { [note: string]: string } = {
  C: '#EF5350',    // Soft Red
  'C#': '#EC407A',
  Db: '#EC407A',
  D: '#AB47BC',    // Violet
  'D#': '#7E57C2',
  Eb: '#7E57C2',
  E: '#5C6BC0',    // Indigo
  F: '#42A5F5',    // Sky Blue
  'F#': '#29B6F6',
  Gb: '#29B6F6',
  G: '#26C6DA',    // Teal Blue
  'G#': '#26A69A',
  Ab: '#26A69A',
  A: '#66BB6A',    // Fresh Green
  'A#': '#9CCC65',
  Bb: '#9CCC65',
  B: '#D4E157'     // Soft Lime
};

const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    tint: tintColorLight,
    tabIconDefault: '#cccccc',
    tabIconSelected: tintColorLight,

    primary: '#2f95dc',        // Blue
    secondary: '#4caf50',      // Green
    surface: '#f2f2f2',        // Light grey surface
    border: '#dddddd',         // Light grey border
    placeholder: '#999999',    // Medium grey for placeholders
    error: '#d32f2f',          // Red error
    success: '#388e3c',        // Green success

    buttonBackground: '#2f95dc',
    buttonText: '#ffffff',

    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    text: '#ffffff',
    background: '#000E14',
    tint: tintColorDark,
    tabIconDefault: '#888888',
    tabIconSelected: tintColorDark,

    primary: '#90caf9',        // Light Blue
    secondary: '#81c784',      // Light Green
    surface: '#121212',        // Dark surface
    border: '#444444',         // Dark grey border
    placeholder: '#000E14',    // Light grey placeholder
    error: '#ef5350',          // Light red error
    success: '#66bb6a',        // Light green success

    buttonBackground: '#90caf9',
    buttonText: '#000000',

    shadow: 'rgba(0, 0, 0, 0.6)',
  },
};

export const typography = {
  fontFamily: 'SpaceMono-Regular',
  fontWeightRegular: '400' as const,
  fontWeightBold: '700' as const,

  fontSizeSmall: 12,
  fontSizeBase: 16,
  fontSizeLarge: 20,
  fontSizeXLarge: 24,
  fontSizeXXLarge: 32,

  heading1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    color: Colors.light.placeholder, // default, can override based on theme
  },
};

export default Colors;
