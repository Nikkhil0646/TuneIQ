import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { noteColors } from "@/constants/Colors";

interface FretboardProps {
  scaleNotes: string[];
  stringTunings?: string[];
  totalFrets?: number;
  showNoteNames?: boolean;
  onNotePress?: (note: string, stringIndex: number, fretIndex: number) => void;
}

const defaultStringTunings = ["E", "B", "G", "D", "A", "E"];
const defaultTotalFrets = 18;

const MIN_FRET_WIDTH = 50;
const MAX_FRET_WIDTH = 90;
const FRET_HEIGHT = 40;

const normalizeNote = (note: string) => note.split("/")[0];
const fretMarkers = [3, 5, 7, 9, 12];

const Fretboard: React.FC<FretboardProps> = ({
  scaleNotes,
  stringTunings = defaultStringTunings,
  totalFrets = defaultTotalFrets,
  showNoteNames = true,
  onNotePress,
}) => {
  const rootNote = normalizeNote(scaleNotes[0]);
  const windowWidth = Dimensions.get("window").width;

  const getInitialFretWidth = () => {
    if (windowWidth <= 480) return 50;
    if (windowWidth <= 900) return 70;
    return 85;
  };

  const [fretWidth, setFretWidth] = useState(getInitialFretWidth());

  useEffect(() => {
    const onChange = ({ window }: { window: any }) => {
      const newWidth = window.width;
      if (newWidth <= 480) setFretWidth(50);
      else if (newWidth <= 900) setFretWidth(70);
      else setFretWidth(85);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription.remove();
  }, []);

  const matchesScaleNote = (fretNote: string) =>
    scaleNotes.some(
      (scaleNote) => normalizeNote(scaleNote) === normalizeNote(fretNote)
    );

  const isRootNote = (fretNote: string) =>
    normalizeNote(fretNote) === rootNote;

  const notes = [
    "A",
    "A#/Bb",
    "B",
    "C",
    "C#/Db",
    "D",
    "D#/Eb",
    "E",
    "F",
    "F#/Gb",
    "G",
    "G#/Ab",
  ];

  const getNoteAtFret = (openNote: string, fret: number): string => {
    const startIndex = notes.findIndex(
      (n) => normalizeNote(n) === normalizeNote(openNote)
    );
    return notes[(startIndex + fret) % 12];
  };

  const noteSize = FRET_HEIGHT * 0.8;

  return (
    <View style={[styles.outerContainer, { maxWidth: windowWidth - 24 }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        <View style={{ flexDirection: "column" }}>
          {/* Fret Numbers */}
          <View style={[styles.stringRow, styles.fretNumberRow]}>
            <View style={styles.labelCell} />
            {Array.from({ length: totalFrets + 1 }).map((_, fretIndex) => (
              <View
                key={`label-${fretIndex}`}
                style={[styles.fretNumberCell, { width: fretWidth, height: FRET_HEIGHT }]}
              >
                <Text style={styles.fretNumberText}>{fretIndex}</Text>

                {fretMarkers.includes(fretIndex) && (
                  <View style={styles.fretMarkerContainer}>
                    {fretIndex === 12 ? (
                      <>
                        <View style={[styles.fretMarkerDot, { left: "30%" }]} />
                        <View style={[styles.fretMarkerDot, { left: "70%" }]} />
                      </>
                    ) : (
                      <View style={[styles.fretMarkerDot, { left: "50%" }]} />
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Strings and Frets */}
          {stringTunings.map((openNote, stringIndex) => (
            <View key={stringIndex} style={styles.stringRow}>
              <View style={styles.labelCell}>
                <Text style={styles.labelText}>{stringIndex + 1}</Text>
              </View>

              {Array.from({ length: totalFrets + 1 }).map((_, fretIndex) => {
                const note = getNoteAtFret(openNote, fretIndex);
                const normalized = normalizeNote(note);
                const inScale = matchesScaleNote(note);
                const isRoot = isRootNote(note);

                const noteCircle = inScale ? (
                  <View
                    style={[
                      styles.noteCircle,
                      {
                        width: noteSize,
                        height: noteSize,
                        borderRadius: noteSize / 2,
                        backgroundColor: isRoot
                          ? noteColors[rootNote] || "#90caf9"
                          : noteColors[normalized] || "#64b5f6",
                        borderColor: isRoot ? "#42a5f5" : "#90caf9",
                      },
                    ]}
                  >
                    {showNoteNames && (
                      <Text
                        style={[
                          styles.circleText,
                          { fontSize: Math.max(noteSize * 0.4, 12) },
                        ]}
                      >
                        {normalized}
                      </Text>
                    )}
                  </View>
                ) : null;

                const handlePress = () => {
                  if (onNotePress) onNotePress(note, stringIndex, fretIndex);
                };

                return (
                  <Pressable
                    key={fretIndex}
                    style={[styles.fret, { width: fretWidth, height: FRET_HEIGHT }]}
                    onPress={handlePress}
                    android_ripple={{ color: "#555" }}
                    accessibilityRole="button"
                    accessibilityLabel={`${normalized} note on string ${
                      stringIndex + 1
                    }, fret ${fretIndex}`}
                  >
                    {fretIndex > 0 && <View style={styles.fretLine} />}
                    <View style={styles.stringLine} />
                    {noteCircle}
                  </Pressable>
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
  outerContainer: {
    marginVertical: 24,
    backgroundColor: "#121212",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  stringRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  fretNumberRow: {
    marginBottom: 14,
  },
  labelCell: {
    width: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  labelText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#ccc",
  },
  fretNumberCell: {
    height: FRET_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  fretNumberText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#eee",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  fretMarkerContainer: {
    position: "absolute",
    bottom: 4,
    width: "100%",
    height: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  fretMarkerDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#aaa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  fret: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#444",
    borderRightWidth: 1,
    backgroundColor: "#1e1e1e",
    position: "relative",
  },
  fretLine: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "#555",
    zIndex: 2,
  },
  stringLine: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#666",
    zIndex: 1,
  },
  noteCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  circleText: {
    fontWeight: "600",
    color: "#fff",
  },
});

export default Fretboard;
