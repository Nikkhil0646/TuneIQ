import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Tuner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tuner</Text>
      <Text style={styles.description}>Tune your instrument with precision.</Text>
      {/* Add tuner functionality here */}
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
  },
  description: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
  },
});
