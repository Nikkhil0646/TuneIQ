import { View, Text, StyleSheet } from 'react-native';

export default function ArpeggiosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arpeggios</Text>
      <Text>Show arpeggio patterns for different chords.</Text>
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
