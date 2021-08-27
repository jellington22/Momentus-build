import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import firebase from 'firebase';

import Colors from '../constants/Colors';

export default function SessionExerciseScreen({ route, navigation }) {
  const db = firebase.firestore();
  const { sessionExerciseId } = route.params;

  const [sets, setSets] = useState([]);
  const [exercise, setExercise] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // Get this exercise's name
      const sessionExerciseSnapshot = await db.collection('sessionExercises').doc(sessionExerciseId).get();
      const exerciseSnapshot = await db.collection('exercises').doc(sessionExerciseSnapshot.data().exerciseId).get();

      setExercise(exerciseSnapshot.data());

      // Get sets belonging to this session exercise
      const setsQuerySnapshot =
        await db.collection("sets")
          .where("sessionExerciseId", "==", sessionExerciseId)
          .get();
      const setsData = setsQuerySnapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          reps: data.reps,
          weight: data.weight,
          exertion: data.exertion,
          notes: data.notes,
        };
      });

      setSets(setsData);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('SetScreen', { sessionExerciseId })}>
          <Text lightColor={Colors.light.tint}>
            Add Set
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        {sets.map(set => {
          return (
            <View key={set.id}>
              <Text>{set.reps} reps / {set.weight} lbs / {set.exertion} / {set.notes}</Text>
            </View>
          )
        })}
      </View>
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
