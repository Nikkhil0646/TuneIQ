import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface ModeToggleProps {
  mode: "major" | "minor";
  onToggle: (mode: "major" | "minor") => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onToggle }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, mode === "major" && styles.active]}
        onPress={() => onToggle("major")}
      >
        <Text style={[styles.text, mode === "major" && styles.activeText]}>Major</Text>
      </Pressable>
      <Pressable
        style={[styles.button, mode === "minor" && styles.active]}
        onPress={() => onToggle("minor")}
      >
        <Text style={[styles.text, mode === "minor" && styles.activeText]}>Minor</Text>
      </Pressable>
    </View>
  );
};

export default ModeToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 16,
    backgroundColor: "#e0e0e0",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  active: {
    backgroundColor: "#4CAF50",
  },
  text: {
    color: "#555",
    fontSize: 16,
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
  },
});
