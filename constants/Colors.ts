import { normalizeNote } from "@/utils/normalizeNote";

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

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
