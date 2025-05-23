import { View, Text, StyleSheet } from 'react-native';

export default function ChordChartsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chord Charts</Text>
      <Text>Display various chord shapes and positions.</Text>
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
