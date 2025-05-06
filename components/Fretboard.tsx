import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const stringTunings = ["E", "B", "G", "D", "A", "E"]; // Strings 1 to 6
const totalFrets = 12;

const Fretboard = ({ scaleNotes }: { scaleNotes: string[] }) => {
  const normalizeNote = (note: string) => note.split("/")[0];

  const rootNote = normalizeNote(scaleNotes[0]); // Assume first note is root

  const matchesScaleNote = (fretNote: string) => {
    return scaleNotes.some(scaleNote => normalizeNote(scaleNote) === normalizeNote(fretNote));
  };

  const isRootNote = (fretNote: string) => {
    return normalizeNote(fretNote) === rootNote;
  };

  const notes = [
    "A", "A♯/B♭", "B", "C", "C♯/D♭", "D",
    "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭"
  ];

  const getNoteAtFret = (openNote: string, fret: number): string => {
    const startIndex = notes.findIndex(n => normalizeNote(n) === normalizeNote(openNote));
    return notes[(startIndex + fret) % 12];
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "column" }}>
          {/* Top row: fret numbers */}
          <View style={styles.stringRow}>
            <View style={styles.labelCell} />
            {Array.from({ length: totalFrets + 1 }).map((_, fretIndex) => (
              <View key={`label-${fretIndex}`} style={styles.fret}>
                <Text style={styles.noteText}>{fretIndex}</Text>
              </View>
            ))}
          </View>

          {/* Strings */}
          {stringTunings.map((openNote, stringIndex) => (
            <View key={stringIndex} style={styles.stringRow}>
              <View style={styles.labelCell}>
                <Text style={styles.labelText}>{stringIndex + 1}</Text>
              </View>
              {Array.from({ length: totalFrets + 1 }).map((_, fretIndex) => {
                const note = getNoteAtFret(openNote, fretIndex);
                const inScale = matchesScaleNote(note);
                const isRoot = isRootNote(note);

                let bgColor = "#e0e0e0";
                if (inScale) bgColor = isRoot ? "#FF9800" : "#4CAF50";

                return (
                  <View
                    key={fretIndex}
                    style={[styles.fret, { backgroundColor: bgColor }]}
                  >
                    <Text style={styles.noteText}>{normalizeNote(note)}</Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  stringRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  fret: {
    width: 36,
    height: 28,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
    borderRadius: 4,
  },
  noteText: {
    fontSize: 10,
    fontWeight: "500",
  },
  labelCell: {
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  labelText: {
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default Fretboard;
