import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AdvancedCircleOfFifths from "@/components/circle/AdvancedCircleOfFifths";
import ModeToggle from "@/components/circle/ModeToggle";
import InfoOverlay from "@/components/circle/InfoOverlay";

export default function CircleOfFifthsScreen() {
  const [mode, setMode] = useState<"major" | "minor">("major");
  const [rootNote, setRootNote] = useState<string>("C");

  const scaleNotes = getScaleNotes(rootNote, mode); // You can define this function locally or import

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Circle of Fifths</Text>
      <ModeToggle mode={mode} onToggle={setMode} />
      <AdvancedCircleOfFifths
        scaleNotes={scaleNotes}
        rootNote={rootNote}
        mode={mode}
        onSelectRoot={setRootNote}
      />
      <InfoOverlay rootNote={rootNote} mode={mode} />
    </View>
  );
}

function getScaleNotes(root: string, mode: "major" | "minor"): string[] {
  // Basic example for demo purposes; replace with your real scale generator logic
  const majorScale = {
    C: ["C", "D", "E", "F", "G", "A", "B"],
    G: ["G", "A", "B", "C", "D", "E", "F#"],
    A: ["A", "B", "C#", "D", "E", "F#", "G#"],
    // Add more as needed
  };

  const minorScale = {
    A: ["A", "B", "C", "D", "E", "F", "G"],
    E: ["E", "F#", "G", "A", "B", "C", "D"],
    D: ["D", "E", "F", "G", "A", "Bb", "C"],
    // Add more as needed
  };

  return mode === "major"
    ? majorScale[root] || []
    : minorScale[root] || [];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
