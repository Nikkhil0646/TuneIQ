import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import CircleOfFifthsWheel from "@/components/CircleOfFifthsWheel";
import { generateScaleWithChordNames, scaleFormulas } from "@/utils/scaleGenerator"; // ✅ updated import
import Fretboard from "@/components/Fretboard"; // Import Fretboard component

const rootNotes = [
  "A", "A♯/B♭", "B", "C", "C♯/D♭", "D",
  "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭"
];

const ScaleScreen = () => {
  const { colors } = useTheme();
  const [selectedRoot, setSelectedRoot] = useState("C");
  const [selectedScale, setSelectedScale] = useState("Major");
  const [showWheel, setShowWheel] = useState(false);
  const [isCircleView, setIsCircleView] = useState(true);
  const [showRootNotes, setShowRootNotes] = useState(false);
  const [generatedScale, setGeneratedScale] = useState<string[]>([]);
  const [generatedChords, setGeneratedChords] = useState<string>("");

  // ⚡ Dynamically get scale types from the updated formulas
  const scaleTypes = Object.keys(scaleFormulas);

  const toggleView = () => {
    setIsCircleView(!isCircleView);
    if (isCircleView) {
      setShowWheel(true);
    } else {
      setShowRootNotes(true);
    }
  };

  const handleGenerateScale = () => {
    const { scale, chords } = generateScaleWithChordNames(selectedRoot, selectedScale);
    setGeneratedScale(scale.split(" ")); // Convert scale string to array
    setGeneratedChords(chords);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Scale Explorer
      </Text>

      <TouchableOpacity
        onPress={toggleView}
        style={{
          padding: 12,
          backgroundColor: colors.card,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: colors.text }}>
          {isCircleView ? "Switch to Root Notes" : "Switch to Circle of Fifths"}
        </Text>
      </TouchableOpacity>

      <Text style={{ color: colors.text, marginBottom: 8 }}>Root Note:</Text>
      <TouchableOpacity
        onPress={() => {
          if (!isCircleView) setShowRootNotes(true);
        }}
        style={{ padding: 12, backgroundColor: colors.card, borderRadius: 8, marginBottom: 16 }}
      >
        <Text style={{ color: colors.text }}>{selectedRoot}</Text>
      </TouchableOpacity>

      <Text style={{ color: colors.text, marginBottom: 8 }}>Scale Type:</Text>
      <View style={{ backgroundColor: colors.card, borderRadius: 8, marginBottom: 16 }}>
        <Picker
          selectedValue={selectedScale}
          onValueChange={(itemValue) => setSelectedScale(itemValue)}
          dropdownIconColor={colors.text}
        >
          {scaleTypes.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        onPress={handleGenerateScale}
        style={{
          padding: 12,
          backgroundColor: colors.primary,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: colors.card }}>Generate Scale</Text>
      </TouchableOpacity>

      {generatedScale.length > 0 && (
        <View style={{ padding: 12, backgroundColor: colors.card, borderRadius: 8 }}>
          <Text style={{ color: colors.text }}>Generated Scale:</Text>
          <Text style={{ color: colors.text }}>{generatedScale.join(" - ")}</Text>
        </View>
      )}

      {generatedChords && (
        <View style={{ padding: 12, backgroundColor: colors.card, borderRadius: 8, marginTop: 16 }}>
          <Text style={{ color: colors.text }}>Chords in the Scale:</Text>
          <Text style={{ color: colors.text }}>{generatedChords}</Text>
        </View>
      )}

      {/* Fretboard with scale notes */}
      {generatedScale.length > 0 && (
        <Fretboard scaleNotes={generatedScale} />
      )}

      {isCircleView ? (
        <Modal visible={showWheel} transparent animationType="fade">
          <CircleOfFifthsWheel
            selectedRoot={selectedRoot}
            onSelect={(note) => {
              setSelectedRoot(note);
              setShowWheel(false);
            }}
            onClose={() => setShowWheel(false)}
          />
        </Modal>
      ) : (
        <Modal visible={showRootNotes} transparent animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View style={{ backgroundColor: colors.card, padding: 16, borderRadius: 8 }}>
              <Text style={{ color: colors.text, fontSize: 18, marginBottom: 12 }}>Select Root Note</Text>
              {rootNotes.map((note) => (
                <TouchableOpacity
                  key={note}
                  onPress={() => {
                    setSelectedRoot(note);
                    setShowRootNotes(false);
                  }}
                  style={{
                    padding: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text style={{ color: colors.text }}>{note}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => setShowRootNotes(false)}
                style={{
                  marginTop: 12,
                  padding: 12,
                  backgroundColor: colors.danger,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: colors.card }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

export default ScaleScreen;
