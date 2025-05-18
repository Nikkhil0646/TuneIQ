import { View, Text, StyleSheet } from 'react-native';

export default function SongAnalyzerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Song Analyzer</Text>
      <Text>Analyze chords and structure of songs.</Text>
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
