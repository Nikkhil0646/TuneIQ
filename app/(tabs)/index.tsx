import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const features = [
  { name: 'Tuner', path: '/Tuner' },
  { name: 'Chord Charts', path: '/ChordCharts' },
  { name: 'Arpeggios', path: '/Arpeggios' },
  { name: 'Chord Progressions', path: '/ChordProgressions' },
  { name: 'Circle of Fifths', path: '/CircleOfFifths' },
  { name: 'Fretboard Explorer', path: '/FretboardExplorer' },
  { name: 'Fretboard Trainer', path: '/FretboardTrainer' },
  { name: 'Key Identifier', path: '/KeyIdentifier' },
  { name: 'Song Analyzer', path: '/SongAnalyzer' },
  { name: 'Scales', path: '/Scales' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Music Tools</Text>
      {features.map((feature, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => router.push(feature.path)}
        >
          <Text style={styles.buttonText}>{feature.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#222',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
