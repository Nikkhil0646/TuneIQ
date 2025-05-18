import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

import CircleOfFifths from "@/components/CircleOfFifths";
import CircleOfFifthsWheel from "@/components/CircleOfFifthsWheel";
import { generateScaleWithChordNames, scaleFormulas } from "@/utils/scaleGenerator";
import Fretboard from "@/components/Fretboard";

// Custom Color Palette
const COLORS = {
  background: "#0f0f1c",
  card: "#1c1c2e",
  text: "#e4e4f7",
  primaryGradientStart: "#6a11cb",
  primaryGradientEnd: "#2575fc",
  accentGradientStart: "#ff416c",
  accentGradientEnd: "#ff4b2b",
  border: "#3a3a50",
  notification: "#ff3d71",
};

const rootNotes = [
  "A", "A♯/B♭", "B", "C", "C♯/D♭", "D", "D♯/E♭",
  "E", "F", "F♯/G♭", "G", "G♯/A♭",
];

const ScaleScreen = () => {
  // State for root note, scale type, toggling between views and modals
  const [selectedRoot, setSelectedRoot] = useState("C");
  const [selectedScale, setSelectedScale] = useState("Major");
  const [showWheel, setShowWheel] = useState(false);
  const [showRootNotes, setShowRootNotes] = useState(false);
  const [isCircleView, setIsCircleView] = useState(true);

  // State for generated scale notes and chords display
  const [generatedScale, setGeneratedScale] = useState<string[]>([]);
  const [generatedChords, setGeneratedChords] = useState<string>("");

  // Get available scale types from scaleFormulas keys
  const scaleTypes = Object.keys(scaleFormulas);

  // Generate scale and chords when requested
  const handleGenerateScale = () => {
    const { scale, chords } = generateScaleWithChordNames(selectedRoot, selectedScale);
    setGeneratedScale(scale.split(" "));
    setGeneratedChords(chords);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: COLORS.background }]}
      contentContainerStyle={{ paddingBottom: 64 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Screen Title */}
      <Text style={styles.title}>Scale Explorer</Text>

      {/* Toggle between Circle of Fifths and Root Notes picker */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setIsCircleView(true)}
          style={[
            styles.toggleButton,
            {
              backgroundColor: isCircleView ? COLORS.primaryGradientEnd : "transparent",
              borderColor: COLORS.primaryGradientEnd,
            },
          ]}
          activeOpacity={0.8}
        >
          <Text style={[styles.toggleText, { color: isCircleView ? "#fff" : COLORS.text }]}>
            Circle of Fifths
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsCircleView(false)}
          style={[
            styles.toggleButton,
            {
              backgroundColor: !isCircleView ? COLORS.accentGradientEnd : "transparent",
              borderColor: COLORS.accentGradientEnd,
            },
          ]}
          activeOpacity={0.8}
        >
          <Text style={[styles.toggleText, { color: !isCircleView ? "#fff" : COLORS.text }]}>
            Root Notes
          </Text>
        </TouchableOpacity>
      </View>

      {/* Root Note Selector */}
      <Text style={styles.label}>Root Note:</Text>
      <TouchableOpacity
        onPress={() => (isCircleView ? setShowWheel(true) : setShowRootNotes(true))}
        style={styles.selector}
        activeOpacity={0.8}
      >
        <Text style={styles.selectorText}>{selectedRoot}</Text>
        <Ionicons name="chevron-down" size={20} color={COLORS.text} />
      </TouchableOpacity>

      {/* Scale Type Picker */}
      <Text style={styles.label}>Scale Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedScale}
          onValueChange={setSelectedScale}
          dropdownIconColor={COLORS.text}
          style={[styles.picker, { color: COLORS.text }]}
        >
          {scaleTypes.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      {/* Generate Scale Button */}
      <TouchableOpacity
        onPress={handleGenerateScale}
        style={styles.generateButton}
        activeOpacity={0.8}
      >
        <Text style={styles.generateButtonText}>Generate Scale</Text>
      </TouchableOpacity>

      {/* Display Generated Scale and Chords */}
      {generatedScale.length > 0 && (
        <>
          <View style={styles.generatedBox}>
            <Text style={styles.generatedLabel}>Generated Scale:</Text>
            <Text style={styles.generatedText}>{generatedScale.join(" - ")}</Text>
          </View>

          <View style={styles.generatedBox}>
            <Text style={styles.generatedLabel}>Chords:</Text>
            <Text style={styles.generatedText}>{generatedChords}</Text>
          </View>

          <Text style={styles.subTitle}>Circle of Fifths Preview</Text>
          <View style={styles.circlePreview}>
            <CircleOfFifths scaleNotes={generatedScale} />
          </View>

          <Fretboard scaleNotes={generatedScale} />
        </>
      )}

      {/* Modal for Circle of Fifths Wheel */}
      <Modal visible={showWheel} transparent animationType="fade" onRequestClose={() => setShowWheel(false)}>
        <CircleOfFifthsWheel
          selectedRoot={selectedRoot}
          onSelect={(note) => {
            setSelectedRoot(note);
            setShowWheel(false);
          }}
          onClose={() => setShowWheel(false)}
        />
      </Modal>

      {/* Modal for Root Notes Grid */}
      <Modal visible={showRootNotes} transparent animationType="fade" onRequestClose={() => setShowRootNotes(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Root Note</Text>
            <View style={styles.rootNotesGrid}>
              {rootNotes.map((note) => (
                <TouchableOpacity
                  key={note}
                  onPress={() => {
                    setSelectedRoot(note);
                    setShowRootNotes(false);
                  }}
                  style={[
                    styles.rootNoteButton,
                    {
                      backgroundColor:
                        selectedRoot === note ? COLORS.primaryGradientStart : COLORS.border,
                    },
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      color: selectedRoot === note ? "#fff" : COLORS.text,
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: 16,
                    }}
                  >
                    {note}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              onPress={() => setShowRootNotes(false)}
              style={styles.closeButton}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
    marginBottom: 24,
    fontFamily: "Montserrat",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 32,
    textAlign: "center",
    marginBottom: 12,
    color: COLORS.text,
    fontFamily: "Montserrat",
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 8,
    
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#6a11cb",
  },
  toggleText: {
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.text,
    fontFamily: "Montserrat",
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 24,
    backgroundColor: COLORS.card,
  },
  selectorText: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: "Montserrat",
  },
  pickerContainer: {
    marginBottom: 32,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#6a11cb",
  },
  picker: {
    height: 48,
    width: "100%",
  },
  generateButton: {
    paddingVertical: 16,
    borderRadius: 20,
    marginBottom: 32,
    alignItems: "center",
    backgroundColor: "#6a11cb",
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Montserrat",
    color: "#fff",
  },
  generatedBox: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
  },
  generatedLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
    color: COLORS.text,
    fontFamily: "Montserrat",
  },
  generatedText: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: "Montserrat",
  },
  circlePreview: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    borderRadius: 16,
    backgroundColor: COLORS.card,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: COLORS.text,
    fontFamily: "Montserrat",
  },
  rootNotesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  rootNoteButton: {
    width: "30%",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  closeButton: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: COLORS.notification,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    fontFamily: "Montserrat",
  },
});

export default ScaleScreen;
