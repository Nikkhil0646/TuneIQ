import { View, Text, StyleSheet } from 'react-native';

export default function FretboardExplorerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fretboard Explorer</Text>
      <Text>Interactive fretboard to explore notes and positions.</Text>
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
