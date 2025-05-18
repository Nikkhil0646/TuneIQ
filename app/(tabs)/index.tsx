import React, { useRef, useEffect } from 'react';
import {
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

// Import the font hook
import { useFonts } from 'expo-font';
import { SpaceGrotesk_400Regular, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';

const features = [
  { name: 'Tuner', path: 'Tuner' },
  { name: 'Chord Charts', path: 'ChordCharts' },
  { name: 'Arpeggios', path: 'Arpeggios' },
  { name: 'Chord Progressions', path: 'ChordProgressions' },
  { name: 'Circle of Fifths', path: 'CircleOfFifths' },
  { name: 'Fretboard Explorer', path: 'FretboardExplorer' },
  { name: 'Fretboard Trainer', path: 'FretboardTrainer' },
  { name: 'Key Identifier', path: 'KeyIdentifier' },
  { name: 'Song Analyzer', path: 'SongAnalyzer' },
  { name: 'Scales', path: 'Scales' },
];

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemMargin = 20;
const itemWidth = (screenWidth - itemMargin * (numColumns + 1)) / numColumns;

export default function HomeScreen() {
  const router = useRouter();

  // Load the font
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_700Bold,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push(`/${item.path}`)}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        }}
      >
        <Text style={styles.buttonText}>{item.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TUNEIQ</Text>
      <FlatList
        data={features}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
    paddingHorizontal: itemMargin,
  },
  title: {
    fontFamily: 'SpaceGrotesk_700Bold', // Use the loaded font here
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
    alignSelf: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: itemMargin,
  },
  button: {
    backgroundColor: '#333',
    width: itemWidth,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
