// Chromatic scale with enharmonic equivalents
const notes: string[] = [
  "A", "A♯/B♭", "B", "C", "C♯/D♭", "D",
  "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭"
];

// All scale formulas
const scaleFormulas: { [key: string]: number[] } = {
  // Diatonic Modes
  Major: [2, 2, 1, 2, 2, 2, 1],
  Minor: [2, 1, 2, 2, 1, 2, 2],
  Dorian: [2, 1, 2, 2, 2, 1, 2],
  Phrygian: [1, 2, 2, 2, 1, 2, 2],
  Lydian: [2, 2, 2, 1, 2, 2, 1],
  Mixolydian: [2, 2, 1, 2, 2, 1, 2],
  Locrian: [1, 2, 2, 1, 2, 2, 2],

  // Pentatonic
  "Major Pentatonic": [2, 2, 3, 2, 3],
  "Minor Pentatonic": [3, 2, 2, 3, 2],

  // Blues
  "Blues (Minor)": [3, 2, 1, 1, 3, 2],
  "Blues (Major)": [2, 1, 1, 3, 2, 2],

  // Harmonic
  "Harmonic Minor": [2, 1, 2, 2, 1, 3, 1],
  "Harmonic Major": [2, 2, 1, 2, 1, 3, 1],

  // Melodic
  "Melodic Minor (Asc)": [2, 1, 2, 2, 2, 2, 1],

  // Melodic Minor Modes
  "Dorian ♭2": [1, 2, 2, 2, 2, 1, 2],
  "Lydian Augmented": [2, 2, 2, 2, 1, 2, 1],
  "Lydian Dominant": [2, 2, 2, 1, 2, 1, 2],
  "Mixolydian ♭6": [2, 2, 1, 2, 1, 2, 2],
  "Locrian ♯2": [2, 1, 2, 1, 2, 2, 2],
  "Altered Scale": [1, 2, 1, 2, 2, 2, 2],

  // Exotic / World
  "Hungarian Minor": [2, 1, 3, 1, 1, 3, 1],
  "Double Harmonic Major": [1, 3, 1, 2, 1, 3, 1],
  "Neapolitan Minor": [1, 2, 2, 2, 1, 3, 1],
  "Neapolitan Major": [1, 2, 2, 2, 2, 2, 1],
  "Phrygian Dominant": [1, 3, 1, 2, 1, 2, 2],
  "Enigmatic": [1, 3, 2, 2, 2, 1, 1]
};

// Get scale from root and scale type
function generateScale(rootNote: string, scaleType: string): string[] {
  const formula = scaleFormulas[scaleType];
  const startIndex = notes.indexOf(rootNote);
  if (startIndex === -1 || !formula) return [];

  const scale: string[] = [rootNote];
  let currentIndex = startIndex;

  formula.forEach(step => {
    currentIndex = (currentIndex + step) % notes.length;
    scale.push(notes[currentIndex]);
  });

  return scale;
}

// Get pure note index for interval comparison
function normalizeNote(note: string): string {
  return note.split("/")[0]; // Just take the first representation (e.g., "A♯" from "A♯/B♭")
}

function noteIndex(note: string): number {
  const baseNote = normalizeNote(note);
  return notes.findIndex(n => normalizeNote(n) === baseNote);
}

// Get chord quality based on intervals
function getChordQuality(triad: string[]): string {
  const [root, third, fifth] = triad.map(note => noteIndex(note));
  const interval3 = (third - root + 12) % 12;
  const interval5 = (fifth - root + 12) % 12;

  if (interval3 === 4 && interval5 === 7) return "Major";
  if (interval3 === 3 && interval5 === 7) return "Minor";
  if (interval3 === 3 && interval5 === 6) return "Diminished";
  if (interval3 === 4 && interval5 === 8) return "Augmented";

  return "Unknown";
}

// Build diatonic chords (triads) from a scale
function buildChords(scale: string[]): string[] {
  const chords: string[] = [];

  for (let i = 0; i < scale.length - 1; i++) {
    const root = scale[i];
    const third = scale[(i + 2) % (scale.length - 1)];
    const fifth = scale[(i + 4) % (scale.length - 1)];
    const triad = [root, third, fifth];
    const quality = getChordQuality(triad);
    chords.push(`${root} ${quality}`);
  }

  return chords;
}

// Master function to generate scale and chords
function generateScaleWithChordNames(rootNote: string, scaleType: string): { scale: string, chords: string } {
  const scale = generateScale(rootNote, scaleType);
  const chords = buildChords(scale);
  return {
    scale: scale.join(" - "),
    chords: chords.join(", ")
  };
}

// Example usage:
const result = generateScaleWithChordNames("C", "Major");
console.log("Generated Scale:\n", result.scale);
console.log("Chords in the Scale:\n", result.chords);

// Exporting for external usage
export { generateScaleWithChordNames, scaleFormulas };
