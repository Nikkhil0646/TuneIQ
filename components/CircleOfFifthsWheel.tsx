import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const notes = [
  "C", "G", "D", "A", "E", "B", "F♯", "C♯", "A♭", "E♭", "B♭", "F"
];

interface Props {
  selectedRoot: string;
  onSelect: (note: string) => void;
  onClose: () => void;
}

const CircleOfFifthsWheel: React.FC<Props> = ({ selectedRoot, onSelect, onClose }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.wheelContainer}>
        <Text style={styles.title}>Select Root Note</Text>
        <View style={styles.notesContainer}>
          {notes.map((note, index) => (
            <TouchableOpacity
              key={note}
              style={[
                styles.noteButton,
                note === selectedRoot && styles.selectedNoteButton,
              ]}
              onPress={() => onSelect(note)}
            >
              <Text style={styles.noteText}>{note}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CircleOfFifthsWheel;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  wheelContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  notesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 16,
  },
  noteButton: {
    padding: 12,
    margin: 6,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
  },
  selectedNoteButton: {
    backgroundColor: "#4caf50",
  },
  noteText: {
    fontSize: 16,
    color: "#000",
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#2196f3",
    borderRadius: 6,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
