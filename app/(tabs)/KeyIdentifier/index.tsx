import { View, Text, StyleSheet } from 'react-native';

export default function KeyIdentifierScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Key Identifier</Text>
      <Text>Enter notes to find possible keys.</Text>
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
