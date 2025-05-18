import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import CircleLayout from "./CircleLayout";
import DiatonicChordRing from "./DiatonicChordRing";
import ModeToggle from "./ModeToggle";
import InfoOverlay from "./InfoOverlay";

interface AdvancedCircleOfFifthsProps {
  scaleNotes: string[];
  currentMode: "major" | "minor";
  onToggleMode: () => void;
  notePositions: { [note: string]: { x: number; y: number } }; // needed for DiatonicChordRing
}

const AdvancedCircleOfFifths: React.FC<AdvancedCircleOfFifthsProps> = ({
  scaleNotes,
  currentMode,
  onToggleMode,
  notePositions,
}) => {
  const [infoVisible, setInfoVisible] = useState(false);

  const openInfo = () => setInfoVisible(true);
  const closeInfo = () => setInfoVisible(false);

  return (
    <View style={styles.container}>
      <CircleLayout scaleNotes={scaleNotes} currentMode={currentMode} />
      <DiatonicChordRing
        scaleNotes={scaleNotes}
        rootNote={scaleNotes[0]}
        mode={currentMode}
        notePositions={notePositions}
      />
      <ModeToggle mode={currentMode} onToggle={onToggleMode} />

      <Pressable onPress={openInfo} style={styles.infoButton} android_ripple={{ color: "#388E3C" }}>
        <Text style={styles.infoButtonText}>Info</Text>
      </Pressable>

      <InfoOverlay visible={infoVisible} onClose={closeInfo} />
    </View>
  );
};

export default AdvancedCircleOfFifths;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  infoButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  infoButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
