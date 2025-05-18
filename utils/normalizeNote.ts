// utils/normalizeNote.ts
export const normalizeNote = (note: string): string => {
    const mappings: { [key: string]: string } = {
      "C#/Db": "C#",
      "Db": "C#",
      "D#/Eb": "D#",
      "Eb": "D#",
      "F#/Gb": "F#",
      "Gb": "F#",
      "G#/Ab": "G#",
      "Ab": "G#",
      "A#/Bb": "A#",
      "Bb": "A#",
      "A♯": "A#",
      "B♭": "A#",
      "C♯": "C#",
      "D♯": "D#",
      "F♯": "F#",
      "G♯": "G#",
      "E♭": "D#",
      "G♭": "F#",
    };
  
    return mappings[note] || note;
  };
  