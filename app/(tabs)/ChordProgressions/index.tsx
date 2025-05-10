import { View, Text, StyleSheet } from 'react-native';

export default function ChordProgressionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chord Progressions</Text>
      <Text>Save and view chord progressions. Transpose as needed.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
