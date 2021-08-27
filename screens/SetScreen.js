import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SetForm from '../components/SetForm';

export default function SetScreen({ route, navigation }) {
  const { sessionExerciseId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <SetForm sessionExerciseId={sessionExerciseId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
