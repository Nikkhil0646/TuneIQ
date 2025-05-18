import React from "react";
import { View, ScrollView, Text, useColorScheme } from "react-native";
import Colors, { typography } from "@/constants/Colors";
import Fretboard from "@/components/Fretboard";

const FretboardScreen = ({ scaleNotes }: { scaleNotes: string[] }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 16 }}>
        <Text
          style={[
            typography.heading2,
            {
              color: theme.text,
              fontFamily: "SpaceGrotesk_700Bold",
              marginBottom: 8,
            },
          ]}
        >
          Fretboard
        </Text>
        <Fretboard scaleNotes={scaleNotes} />
      </View>
    </ScrollView>
  );
};

export default FretboardScreen;
