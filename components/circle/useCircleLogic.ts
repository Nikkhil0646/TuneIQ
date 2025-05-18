import { useMemo } from "react";

// Core chromatic notes (12-tone)
const NOTES = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];

// Circle of Fifths order (clockwise)
const FIFTHS = ["C", "G", "D", "A", "E", "B", "F#/Gb", "C#/Db", "G#/Ab", "D#/Eb", "A#/Bb", "F"];

// Scale formulas (W=2, H=1 in semitones)
const MODES: Record<string, number[]> = {
  ionian:     [2, 2, 1, 2, 2, 2, 1], // Major
  dorian:     [2, 1, 2, 2, 2, 1, 2],
  phrygian:   [1, 2, 2, 2, 1, 2, 2],
  lydian:     [2, 2, 2, 1, 2, 2, 1],
  mixolydian: [2, 2, 1, 2, 2, 1, 2],
  aeolian:    [2, 1, 2, 2, 1, 2, 2], // Natural Minor
  locrian:    [1, 2, 2, 1, 2, 2, 2],
};

const ROMAN_NUMERALS = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];

export const useCircleLogic = ({
  rootNote = "C",
  mode = "ionian",
}: {
  rootNote: string;
  mode?: keyof typeof MODES;
}) => {
  const rootIndex = NOTES.findIndex(n => n.includes(rootNote));
  const modePattern = MODES[mode || "ionian"];

  // Build scale notes from root + mode
  const scaleNotes = useMemo(() => {
    const result: string[] = [];
    let idx = rootIndex;
    result.push(NOTES[idx]);

    for (const step of modePattern) {
      idx = (idx + step) % 12;
      result.push(NOTES[idx]);
    }
    return result.slice(0, 7);
  }, [rootNote, mode]);

  // Get diatonic chords in Roman numeral format
  const diatonicChords = useMemo(() => {
    return scaleNotes.map((note, i) => ({
      note,
      numeral: ROMAN_NUMERALS[i],
    }));
  }, [scaleNotes]);

  // Get polar coordinates for circular layout
  const getPositionForIndex = (index: number, radius: number, center = 150) => {
    const angle = (2 * Math.PI * index) / 12 - Math.PI / 2; // Start from top
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y, angle };
  };

  // Utility: returns enharmonics for a given note (e.g. C#/Db → ["C#", "Db"])
  const getEnharmonics = (note: string) => note.split("/").map(n => n.trim());

  // Whether a note (or its enharmonic) is in the current scale
  const isNoteInScale = (note: string) =>
    getEnharmonics(note).some(n =>
      scaleNotes.some(scaleNote => getEnharmonics(scaleNote).includes(n))
    );

  const isRootNote = (note: string) =>
    getEnharmonics(note).includes(rootNote);

  return {
    FIFTHS,
    NOTES,
    rootNote,
    scaleNotes,
    diatonicChords,
    getPositionForIndex,
    isNoteInScale,
    isRootNote,
  };
};
