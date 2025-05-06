import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons"; // Import icon for dropdown

import CircleOfFifthsWheel from "@/components/CircleOfFifthsWheel";
import { generateScaleWithChordNames, scaleFormulas } from "@/utils/scaleGenerator";
import Fretboard from "@/components/Fretboard";

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

  const scaleTypes = Object.keys(scaleFormulas);

  const toggleView = () => {
    setIsCircleView(!isCircleView);
  };

  const handleGenerateScale = () => {
    const { scale, chords } = generateScaleWithChordNames(selectedRoot, selectedScale);
    setGeneratedScale(scale.split(" "));
    setGeneratedChords(chords);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Scale Explorer
      </Text>

      <View
  style={{
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  }}
>
  <TouchableOpacity
    onPress={() => setIsCircleView(true)}
    style={{
      flex: 1,
      paddingVertical: 12,
      backgroundColor: isCircleView ? colors.primary : "transparent",
      alignItems: "center",
    }}
  >
    <Text style={{ color: isCircleView ? colors.card : colors.text }}>Circle of Fifths</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => setIsCircleView(false)}
    style={{
      flex: 1,
      paddingVertical: 12,
      backgroundColor: !isCircleView ? colors.primary : "transparent",
      alignItems: "center",
    }}
  >
    <Text style={{ color: !isCircleView ? colors.card : colors.text }}>Root Notes</Text>
  </TouchableOpacity>
</View>


      <Text style={{ color: colors.text, marginBottom: 8 }}>Root Note:</Text>
      <TouchableOpacity
        onPress={() => {
          if (isCircleView) {
            setShowWheel(true);
          } else {
            setShowRootNotes(true);
          }
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 12,
          backgroundColor: colors.card,
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: colors.text }}>{selectedRoot}</Text>
        <Ionicons name="chevron-down" size={20} color={colors.text} />
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

      {generatedScale.length > 0 && (
        <Fretboard scaleNotes={generatedScale} />
      )}

      {/* Root Note Selectors */}
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
    <View
      style={{
        backgroundColor: colors.card,
        padding: 20,
        borderRadius: 16,
        width: "90%",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 16,
        }}
      >
        Select Root Note
      </Text>

      {/* Wrapping Notes in Grid */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {rootNotes.map((note) => (
          <TouchableOpacity
            key={note}
            onPress={() => {
              setSelectedRoot(note);
              setShowRootNotes(false);
            }}
            style={{
              backgroundColor: selectedRoot === note ? colors.primary : colors.border,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 100,
              margin: 6,
            }}
          >
            <Text
              style={{
                color: selectedRoot === note ? colors.card : colors.text,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {note}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => setShowRootNotes(false)}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 24,
          backgroundColor: colors.danger,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: colors.card, fontWeight: "bold" }}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      )}
    </ScrollView>
  );
};

export default ScaleScreen;
