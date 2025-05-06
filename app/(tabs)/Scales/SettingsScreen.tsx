import React, { useState } from "react";
import { View, Text, TouchableOpacity, Picker } from "react-native";
import { useTheme } from "@react-navigation/native";
import { tunings } from "@/utils/tunings"; // Assuming tunings are defined in tunings.ts

const SettingsScreen = () => {
  const { colors } = useTheme();
  const [selectedTuning, setSelectedTuning] = useState("Standard");

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Tuning Settings
      </Text>

      <Text style={{ color: colors.text, marginBottom: 8 }}>Select Tuning:</Text>
      <View style={{ backgroundColor: colors.card, borderRadius: 8, marginBottom: 16 }}>
        <Picker
          selectedValue={selectedTuning}
          onValueChange={(itemValue) => setSelectedTuning(itemValue)}
          dropdownIconColor={colors.text}
        >
          {Object.keys(tunings).map((tuning) => (
            <Picker.Item key={tuning} label={tuning} value={tuning} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        onPress={() => {}}
        style={{
          padding: 12,
          backgroundColor: colors.primary,
          borderRadius: 8,
          marginTop: 16,
        }}
      >
        <Text style={{ color: colors.card }}>Save Tuning</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
